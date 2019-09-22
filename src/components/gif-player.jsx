import cx from 'classnames';
import React from 'react';
import 'react-gif-player/dist/gifplayer.css';
import styles from './gif-player.module.scss';

export const GifPlayer = ({
  gif,
  still,
  alt,
  containerClassName,
  onFocus,
  ...rest
}) => {
  const [playing, setPlaying] = React.useState(false);

  const toggle = () => setPlaying(prevPlaying => !prevPlaying);

  return (
    <div
      className={cx(
        'gif_player',
        styles.root,
        playing && 'playing',
        containerClassName
      )}
      tabIndex={0}
      onClick={toggle}
      onFocus={onFocus}
      aria-label="Enter to toggle animated and static image"
      onKeyDown={ev => {
        if (ev.key === ' ' || ev.key === 'Enter') {
          ev.preventDefault();
          toggle();
        }
      }}
    >
      <div className="play_button" />
      <img alt={alt} {...rest} src={playing ? gif || still : still || gif} />
    </div>
  );
};
