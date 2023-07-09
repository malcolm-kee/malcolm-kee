import { computePosition, autoPlacement, offset, size } from '@floating-ui/dom';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Button } from '../Button';
import styles from './onboarding.module.css';
import { viewTransition } from '~/lib/view-transition';
import { CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '~/components/icons';

export interface OnboardingStep {
  targetSelector: string;
  text: string;
}

const onBoarding = (steps: Array<OnboardingStep>) => {
  let currentStepIndex = 0;

  const tooltip = document.createElement('div');
  tooltip.classList.add(styles.tooltip, 'hidden');
  const ring = document.createElement('div');
  ring.classList.add(styles.ring, 'hidden');

  document.body.appendChild(tooltip);
  document.body.appendChild(ring);

  const root = createRoot(tooltip);

  const render = () => {
    const currentStep = steps[currentStepIndex];

    if (currentStep) {
      const target = Array.from(document.querySelectorAll(currentStep.targetSelector)).filter(
        (element) => {
          const styles = window.getComputedStyle(element);
          return styles.display !== 'none' && styles.visibility !== 'hidden';
        }
      )[0];

      if (target) {
        tooltip.classList.remove('hidden');
        ring.classList.remove('hidden');

        const isLastStep = currentStepIndex === steps.length - 1;

        flushSync(() => {
          root.render(
            <div>
              <p className="text-sm text-slate-500">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
              <p>{currentStep.text}</p>
              <div className="flex justify-between items-center gap-3">
                {currentStepIndex === 0 ? (
                  <span />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      currentStepIndex--;
                      render();
                    }}
                    className="w-8 h-8 inline-flex justify-center items-center shadow rounded-full"
                  >
                    <ChevronLeftIcon className="w-5 h-5 stroke-slate-500" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (isLastStep) {
                      root.unmount();
                      tooltip.remove();
                      ring.remove();
                    } else {
                      currentStepIndex++;
                      render();
                    }
                  }}
                  className="w-8 h-8 inline-flex justify-center items-center shadow rounded-full"
                >
                  {isLastStep ? (
                    <CheckCircleIcon className="w-7 h-7 text-green-500" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 stroke-slate-500" />
                  )}
                </button>
              </div>
            </div>
          );
        });

        Promise.all([
          computePosition(target, tooltip, {
            strategy: 'absolute',
            middleware: [
              offset(8),
              autoPlacement({
                alignment: 'start',
              }),
            ],
          }),
          computePosition(target, ring, {
            strategy: 'absolute',
            placement: 'bottom',
            middleware: [
              size({
                apply({ elements }) {
                  const referenceStyle = window.getComputedStyle(elements.reference as any);

                  Object.assign(elements.floating.style, {
                    width: `calc(${referenceStyle.width} + 1rem)`,
                    height: `calc(${referenceStyle.height} + 1rem)`,
                  });
                },
              }),
              offset(({ rects }) => -rects.reference.height / 2 - rects.floating.height / 2),
            ],
          }),
        ]).then(([tooltipResult, ringResult]) => {
          const transition = viewTransition(() => {
            Object.assign(tooltip.style, {
              left: `${tooltipResult.x}px`,
              top: `${tooltipResult.y}px`,
            });

            Object.assign(ring.style, {
              left: `${ringResult.x}px`,
              top: `${ringResult.y}px`,
            });
          });

          const scrollTargetIntoView = () =>
            scrollIntoView(target, {
              scrollMode: 'if-needed',
              behavior: 'smooth',
            });

          if (transition) {
            transition.finished.then(scrollTargetIntoView);
          } else {
            scrollTargetIntoView();
          }
        });
      }
    }
  };

  render();
};

export const ViewTransitionBlogOnboardingButton = () => {
  return (
    <Button
      onClick={() =>
        onBoarding([
          {
            targetSelector: 'h1',
            text: 'This is title of this blog',
          },
          {
            targetSelector: '[aria-label="Back to all blogs"]',
            text: 'This button brings you to all blogs page',
          },
          {
            targetSelector: '#using-view-transition-api',
            text: 'Learn how the API works',
          },
          {
            targetSelector: '#view-transition-onboarding-btn',
            text: `We're back!`,
          },
        ])
      }
      id="view-transition-onboarding-btn"
    >
      Start onboarding
    </Button>
  );
};
