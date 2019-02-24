import React from 'react';
import { Link } from 'gatsby';
import { joinClassName } from 'join-string';

import { throttle } from '../helper';
import './Header.scss';

const shrinkOn = 20;

export class Header extends React.Component {
  state = {
    shrink: false,
  };

  render() {
    const { isBanner } = this.props;
    return (
      <header
        className={joinClassName(
          'Header',
          this.state.shrink && 'shrink',
          isBanner && 'Header--banner'
        )}
      >
        <div className="heading-container">
          <div className="heading">
            <h1>
              <Link to="/">
                <span>
                  M<span className="hideable">alcolm&nbsp;</span>
                </span>
                <span>
                  K<span className="hideable">ee</span>
                </span>
                &nbsp;
              </Link>
            </h1>
          </div>
        </div>
      </header>
    );
  }

  onWindowScroll = throttle(() => {
    const scroll = window.pageYOffset || document.documentElement.scrollTop;

    if (scroll >= shrinkOn && !this.state.shrink) {
      this.setState({
        shrink: true,
      });
    } else if (scroll < shrinkOn && this.state.shrink) {
      this.setState({
        shrink: false,
      });
    }
  });

  componentDidMount() {
    this.onWindowScroll();
    window.addEventListener('scroll', this.onWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }
}
