import React from 'react';

export const ReactTypescriptIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="React"
      role="img"
      viewBox="32 32 448 448"
    >
      <circle cx="256" cy="256" r="36" fill="#294e80" />
      <circle cx="256" cy="256" r="30" fill="#61dafb" />
      <path
        stroke="#294e80"
        strokeWidth="16"
        fill="none"
        d="M317.47 291.43a71 183 30 1 0-.05.09zm-122.89.09a183 71 60 1 0-.05-.09zm61.47 35.43a183 71 0 1 0-.1 0z"
        id="orbit"
      />
      <circle r="10" fill="#61dafb">
        <animateMotion dur="6s" repeatCount="indefinite">
          <mpath xlinkHref="#orbit"></mpath>
        </animateMotion>
      </circle>
    </svg>
  );
};
