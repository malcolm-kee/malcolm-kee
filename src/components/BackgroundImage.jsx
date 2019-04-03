import React from 'react';
import BackgroundImage from 'gatsby-background-image';

export const BackgroundImg = ({
  objFit = `cover`,
  objPosition = `50% 50%`,
  ...props
}) => (
  <BackgroundImage
    {...props}
    imgStyle={{
      ...props.imgStyle,
      objectFit: objFit,
      objectPosition: objPosition,
      fontFamily: `"object-fit: ${objFit}; object-position: ${objPosition}"`
    }}
  />
);
