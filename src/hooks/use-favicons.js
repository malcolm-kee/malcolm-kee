import React from 'react';
import { noop } from '../helper';

const FavIconContext = React.createContext(noop);

export const FavIconProvider = FavIconContext.Provider;

export const useFavIcon = ({ iconFile, contentId }) => {
  const setFavIconFolder = React.useContext(FavIconContext);

  React.useEffect(() => {
    if (iconFile && contentId) {
      setFavIconFolder(contentId);
    }

    return () => setFavIconFolder(null);
  }, []);
};
