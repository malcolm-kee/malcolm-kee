import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { isNil } from 'typesafe-is';
import { createClient, Provider } from 'urql';
import { CodeRenderer } from '../components/code-renderer';
import { ErrorBoundary } from '../components/error-boundary';
import { MdxLink } from '../components/mdx-link';
import { Ol } from '../components/ol';
import { Ul } from '../components/ul';
import { Aside } from '../components/workshop/aside';
import { Exercise } from '../components/workshop/exercise';
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
  a: MdxLink,
  aside: Aside,
  code: CodeRenderer,
  inlineCode: ({ children }) => (
    <code className="language-text">{children}</code>
  ),
  ol: Ol,
  ul: Ul,
  Exercise,
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
  }, [location.pathname, isRoot]);

  const { workshop, lessonGroup } = pageContext;

  return (
    <ErrorBoundary>
      <Provider value={githubClient}>
        <ThemeProvider value={themeValue}>
          <MDXProvider components={mdxComponents}>
            {isNil(workshop) ? (
              <Layout isRoot={isRoot}>{children}</Layout>
            ) : (
              <WorkshopLayout
                workshop={workshop}
                workshopSections={lessonGroup}
                pathname={location.pathname}
              >
                {children}
              </WorkshopLayout>
            )}
          </MDXProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

function useTheme() {
  const [theme, setTheme] = React.useState(null);

  const initThemeSetup = React.useRef(() => {
    if (theme !== window.__theme) {
      setTheme(window.__theme);
    }
    window.__onThemeChange = () => {
      setTheme(window.__theme);
    };
  });

  React.useEffect(() => {
    initThemeSetup.current();
  }, []);

  const themeValue = React.useMemo(
    () => [
      theme,
      function toggle() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        window.__setPreferredTheme(newTheme);
      },
    ],
    [theme]
  );

  return themeValue;
}

export default LayoutContainer;
