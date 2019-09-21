import cx from 'classnames';
import React from 'react';
import 'react-gif-player/dist/gifplayer.css';

export const GifPlayer = ({ gif, still, playing, toggle, ...rest }) => (
  <div
    className={cx('gif_player', { playing: playing })}
    tabIndex={0}
    onClick={toggle}
    aria-label="Enter to toggle animated and static image"
  >
    <div className="play_button" />
    <img {...rest} src={playing ? gif || still : still || gif} />
  </div>
);
