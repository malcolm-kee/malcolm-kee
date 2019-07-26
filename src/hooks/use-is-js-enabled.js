import React from 'react';

const JsEnabledContext = React.createContext(false);

export const JsEnabledProvider = ({ children }) => {
  const [isJsEnabled, setIsJsEnabled] = React.useState(false);

  React.useLayoutEffect(() => {
    setIsJsEnabled(true);
  }, []);

  return (
    <JsEnabledContext.Provider value={isJsEnabled}>
      {children}
    </JsEnabledContext.Provider>
  );
};

/**
 * check JS is enabled by checking component is mounted with JS
 * This should be used to show UI that is JS dependent and a fallback that is accessible without JS.
 */
export function useIsJsEnabled() {
  return React.useContext(JsEnabledContext);
}
