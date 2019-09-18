import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { createClient, Provider } from 'urql';
import { CodeRenderer } from '../components/code-renderer';
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

  const {
    isWorkshop,
    workshopId,
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
              workshopRoot={`/${workshopId}`}
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
