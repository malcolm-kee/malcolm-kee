import React from 'react';
import { Link } from 'gatsby';

import { throttle, getClassName } from '../helper';
import './Header.scss';

const shrinkOn = 20;

export class Header extends React.Component {
  state = {
    shrink: false,
  };

  render() {
    return (
      <header className={getClassName('Header', this.state.shrink && 'shrink')}>
        <div className="heading">
          <h1>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
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
