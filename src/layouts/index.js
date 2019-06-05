import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { CodeEditor } from '../components/code-editor';
import { Layout } from '../components/Layout';
import { ThemeProvider } from '../theme';

const mdxComponents = {
  code: CodeEditor
};

const LayoutContainer = ({ children, pageContext }) => {
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    if (theme !== window.__theme) {
      setTheme(window.__theme);
    }
    window.__onThemeChange = () => {
      setTheme(window.__theme);
    };
  }, []);

  const themeValue = React.useMemo(
    () => ({
      toggle: function() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        window.__setPreferredTheme(newTheme);
      },
      value: theme
    }),
    [theme]
  );

  return (
    <ThemeProvider value={themeValue}>
      <MDXProvider components={mdxComponents}>
        <Layout isRoot={pageContext.isRoot}>{children}</Layout>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default LayoutContainer;
