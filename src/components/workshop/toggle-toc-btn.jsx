import React from 'react';
import { ChevronIcon } from '../chevron-icon';
import './toggle-toc-btn.scss';

export const ToggleTocBtn = React.forwardRef(
  ({ open, onToggle, backgroundColor = '#e44d26', color }, ref) => {
    const iconOffset = open ? 8 : -4;

    return (
      <div
        className="toggle-toc-btn"
        role="button"
        tabIndex={0}
        onClick={onToggle}
        aria-label="Toggle Table of Contents"
        ref={ref}
        onKeyPress={ev => {
          if (ev.which === 32 || ev.which === 13) {
            ev.preventDefault(); // prevent default scroll behavior when space is pressed
            onToggle();
          }
        }}
        style={{ backgroundColor }}
      >
        <div className="toggle-toc-btn-container">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              width: 20,
              height: 20,
            }}
          >
            <ChevronIcon
              size={15}
              styles={{
                color,
                transform: `translate(2px, ${iconOffset}px) rotate(180deg)`,
                transition: 'transform 0.2s ease',
              }}
            />
            <ChevronIcon
              size={15}
              styles={{
                color,
                transform: `translate(2px, ${0 - iconOffset}px)`,
                transition: 'transform 0.2s ease',
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);
