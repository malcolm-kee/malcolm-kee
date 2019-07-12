import React from 'react';

/**
 * check JS is enabled by checking component is mounted with JS
 * This should be used to show UI that is JS dependent and a fallback that is accessible without JS.
 */
export function useIsJsEnabled() {
  const [isJsEnabled, setIsJsEnabled] = React.useState(false);

  React.useLayoutEffect(() => {
    setIsJsEnabled(true);
  }, []);

  return isJsEnabled;
}
