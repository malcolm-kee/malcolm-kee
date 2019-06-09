import React from 'react';
import Helmet from 'react-helmet';

export const FavIcons = ({ iconFolder }) => {
  if (!iconFolder) {
    return (
      <Helmet>
        <link rel="shortcut icon" href="/icons/icon-48x48.png" />
      </Helmet>
    );
  }

  return (
    <Helmet>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/${iconFolder}/icon-16x16.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/${iconFolder}/icon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="64x64"
        href={`/${iconFolder}/icon-64x64.png`}
      />
    </Helmet>
  );
};
