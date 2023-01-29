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
  arrow,
}: {
  anchor: Element;
  tooltip: HTMLElement;
  arrow: HTMLElement;
}) => {
  tooltip.classList.add(styles.tooltip!);
  arrow.classList.add(styles.arrow!);

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
      placement: 'right-start',
      middleware: [
        offset(8),
        flip(),
        shift(),
        arrowMiddleware({
          element: arrow,
        }),
        size({
          apply({ availableHeight, availableWidth, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
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
    });
  }

  function hideTooltip() {
    tooltip.style.display = 'none';
  }
};

const getSide = (placement: Placement) => {
  return placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';
};
