import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { CodeEditor } from '../components/code-editor';
import { ThemeProvider } from '../theme';
import { Layout } from './default-layout';
import { WorkshopLayout } from './workshop-layout';

const mdxComponents = {
  code: CodeEditor
};

const LayoutContainer = ({ children, pageContext, location }) => {
  const themeValue = useTheme();

  const {
    isWorkshop,
    workshop,
    workshopTitle,
    workshopThemeColor,
    lessonGroup,
    isRoot
  } = pageContext;

  return (
    <ThemeProvider value={themeValue}>
      <MDXProvider components={mdxComponents}>
        {isWorkshop ? (
          <WorkshopLayout
            workshopTitle={workshopTitle}
            workshopThemeColor={workshopThemeColor}
            workshopRoot={`/${workshop}`}
            workshopSections={lessonGroup}
            pathname={location.pathname}
          >
            {children}
          </WorkshopLayout>
        ) : (
          <Layout isRoot={isRoot}>{children}</Layout>
        )}
      </MDXProvider>
    </ThemeProvider>
  );
};

function useTheme() {
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

  return themeValue;
}

export default LayoutContainer;
