import * as React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/Header';

export const Layout = ({ children, location }) => {
  const [isRoot, setIsRoot] = React.useState(() => location.pathname === '/');
  React.useEffect(() => {
    if (location.pathname === '/' && !isRoot) {
      setIsRoot(true);
    } else if (location.pathname !== '/' && isRoot) {
      setIsRoot(false);
    }
  }, [location.pathname, isRoot]);

  return (
    <div className="Layout">
      {!isRoot && <Header siteTitle="Malcolm Kee" />}
      {children}
      <Footer />
    </div>
  );
};
