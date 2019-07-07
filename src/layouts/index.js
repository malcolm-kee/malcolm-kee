import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { Provider, createClient } from 'urql';
import { CodeRenderer } from '../components/code-renderer';
import { FavIcons } from '../components/favicons';
import { FavIconProvider } from '../hooks/use-favicons';
import { ThemeProvider } from '../theme';
import { Layout } from './default-layout';
import { WorkshopLayout } from './workshop-layout';

const githubClient = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
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
  const [favIconFolder, setIconFolder] = React.useState(null);

  const {
    isWorkshop,
    workshop,
    workshopTitle,
    workshopThemeColor,
    lessonGroup,
    isRoot,
  } = pageContext;

  return (
    <Provider value={githubClient}>
      <ThemeProvider value={themeValue}>
        <FavIconProvider value={setIconFolder}>
          <MDXProvider components={mdxComponents}>
            <FavIcons iconFolder={favIconFolder} />
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
        </FavIconProvider>
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
