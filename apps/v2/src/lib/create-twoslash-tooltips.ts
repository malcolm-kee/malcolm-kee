import { createTooltip } from './create-tooltip';

export function createTwoslashTooltips(container: Element) {
  const twoSlashPre = container.querySelector<HTMLPreElement>('pre.twoslash');
  const twoSlashElements = container.querySelectorAll('span.twoslash-hover');

  const { tooltipContainer, portalTarget } = createTooltipContainer();

  if (twoSlashPre) {
    // copy twoslash custom properties
    tooltipContainer.style.cssText = twoSlashPre.style.cssText;
  }

  let hasTooltip = false;

  twoSlashElements.forEach((twoSlashElement) => {
    if (twoSlashElement.classList.contains('twoslash-query-presisted')) {
      return;
    }

    const popupElement = twoSlashElement.querySelector('.twoslash-popup-container');

    if (popupElement && popupElement instanceof HTMLElement) {
      popupElement.classList.add('overflow-y-auto');
      Object.assign(popupElement.style, {
        position: 'fixed',
        display: 'none',
        opacity: '1',
        transform: 'none',
      });

      // portal the popup element to avoid it being clipped by the parent element
      // see https://floating-ui.com/docs/misc#clipping
      portalTarget.appendChild(popupElement);
      hasTooltip = true;

      createTooltip({
        anchor: twoSlashElement,
        tooltip: popupElement,
        placement: 'top-start',
        strategy: 'fixed',
      });
    }
  });

  if (hasTooltip) {
    container.appendChild(tooltipContainer);
  }
}

function createTooltipContainer() {
  const tooltipContainer = document.createElement('pre');
  tooltipContainer.classList.add('astro-code', 'twoslash', '!p-0', '!border-0');

  const portalTarget = document.createElement('span');
  portalTarget.classList.add('twoslash-hover');
  tooltipContainer.appendChild(portalTarget);

  return { tooltipContainer, portalTarget };
}
