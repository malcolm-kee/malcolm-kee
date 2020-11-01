import { MDXProvider } from '@mdx-js/react';
import * as React from 'react';
import cx from 'classnames';
import { CodeRenderer } from '../components/code-renderer';
import { ErrorBoundary } from '../components/error-boundary';
import { Helmet } from 'react-helmet';
import { MdxLink } from '../components/mdx-link';
import { Ol } from '../components/ol';
import { Ul } from '../components/ul';
import { Aside } from '../components/workshop/aside';
import { Exercise } from '../components/workshop/exercise';
import { ThemeProvider } from '../theme';
import { Layout } from './default-layout';
import { EduLayout } from './edu-layout';
import { LayoutContext } from './layout-context';
import { WorkshopLayout } from './workshop-layout';

const Fragment = ({ children }) => <React.Fragment>{children}</React.Fragment>;

const mdxComponents = {
  a: MdxLink,
  aside: Aside,
  code: CodeRenderer,
  inlineCode: ({ children }) => (
    <code className="language-text">{children}</code>
  ),
  pre: (props) => (
    <pre {...props} className={cx('full-bleed', props.className)} />
  ),
  ol: Ol,
  ul: Ul,
  Exercise,
};

const LayoutContainer = ({ children, pageContext, location }) => {
  const themeValue = useTheme();
  const [layoutType, setLayoutType] = React.useState('standard');

  const LayoutByType = {
    standard: Layout,
    edu: EduLayout,
    workshop: WorkshopLayout,
    none: Fragment,
  };

  const LayoutComponent = LayoutByType[layoutType] || Fragment;

  return (
    <ErrorBoundary>
      <Helmet>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>
      <LayoutContext.Provider value={setLayoutType}>
        <ThemeProvider value={themeValue}>
          <MDXProvider components={mdxComponents}>
            <LayoutComponent pageContext={pageContext} location={location}>
              {children}
            </LayoutComponent>
          </MDXProvider>
        </ThemeProvider>
      </LayoutContext.Provider>
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
