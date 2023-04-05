import styles from './shiny-effect.module.css';

export const setupShinyEffect = (element: HTMLElement, hoverTarget: HTMLElement = element) => {
  const onPointerMove = (ev: PointerEvent) => {
    const rect = element.getBoundingClientRect();
    hoverTarget.style.setProperty('--pointer-x', String(ev.clientX - rect.left));
    hoverTarget.style.setProperty('--pointer-y', String(ev.clientY - rect.top));
  };

  hoverTarget.addEventListener('pointermove', onPointerMove);

  hoverTarget.classList.add(styles.container);
  element.classList.add(styles.element);

  return function cleanupShinyEffect() {
    hoverTarget.removeEventListener('pointermove', onPointerMove);

    hoverTarget.classList.remove(styles.container);
    element.classList.remove(styles.element);
  };
};
