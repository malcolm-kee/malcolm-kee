import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { createClient, Provider } from 'urql';
import { CodeRenderer } from '../components/code-renderer';
import { ThemeProvider } from '../theme';
import { Layout } from './default-layout';
import { WorkshopLayout } from './workshop-layout';

const githubClient = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
    },
  },
});

const mdxComponents = {
  code: CodeRenderer,
  inlineCode: ({ children }) => (
    <code className="language-text">{children}</code>
  ),
};

const LayoutContainer = ({ children, pageContext, location }) => {
  const themeValue = useTheme();

  const [isRoot, setIsRoot] = React.useState(() => location.pathname === '/');
  React.useEffect(() => {
    if (location.pathname === '/' && !isRoot) {
      setIsRoot(true);
    } else if (location.pathname !== '/' && isRoot) {
      setIsRoot(false);
    }
  }, [location.pathname]);

  const {
    isWorkshop,
    workshop,
    workshopTitle,
    workshopThemeColor,
    lessonGroup,
  } = pageContext;

  return (
    <Provider value={githubClient}>
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
    </Provider>
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
      value: theme,
    }),
    [theme]
  );

  return themeValue;
}

export default LayoutContainer;
