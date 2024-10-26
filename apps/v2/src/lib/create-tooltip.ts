import {
  arrow as arrowMiddleware,
  computePosition,
  flip,
  offset,
  shift,
  size,
  type Placement,
} from '@floating-ui/dom';
import styles from './create-tooltip.module.css';

export const createTooltip = ({
  anchor,
  tooltip,
  placement,
  strategy = 'absolute',
  withStyles,
  minWidthPx,
  offsetPx,
  arrow,
}: {
  anchor: Element;
  tooltip: HTMLElement;
  placement: Placement;
  withStyles?: boolean;
  minWidthPx?: number;
  offsetPx?: number;
  strategy?: 'absolute' | 'fixed';
  arrow?: HTMLElement;
}) => {
  if (withStyles) {
    tooltip.classList.add(styles.tooltip!);
    if (arrow) {
      arrow.classList.add(styles.arrow!);
    }
  }

  (
    [
      ['mouseenter', showTooltip],
      ['mouseleave', hideTooltip],
      ['focus', showTooltip],
      ['blur', hideTooltip],
    ] as const
  ).forEach(([event, cb]) => anchor.addEventListener(event, cb));

  function showTooltip() {
    tooltip.style.display = 'block';
    computePosition(anchor, tooltip, {
      placement,
      strategy,
      middleware: [
        offsetPx ? offset(offsetPx) : null,
        flip(),
        shift(),
        arrow &&
          arrowMiddleware({
            element: arrow,
          }),
        size({
          apply({ availableHeight, availableWidth, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: minWidthPx
                ? `min(${minWidthPx}px, 50vw, ${availableWidth}px)`
                : `${availableWidth}px`,
              maxHeight: `${availableHeight}px`,
            });
          },
        }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {};

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[getSide(placement)];

        Object.assign(arrow.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-4px',
        });
      }
    });
  }

  function hideTooltip() {
    tooltip.style.display = 'none';
  }
};

const getSide = (placement: Placement) => {
  return placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';
};
