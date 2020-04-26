import * as React from 'react';
import AwesomeSlider, { AwesomeSliderProps } from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import styles from './slide.module.scss';

export const Slide = (props: AwesomeSliderProps) => (
  <AwesomeSlider
    cssModule={AwesomeSliderStyles}
    className={styles.root}
    infinite={false}
    {...props}
  />
);
