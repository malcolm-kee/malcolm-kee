import React from 'react';
import githubLogo from '../assets/github-logo.png';
import linkedInIcon from '../assets/linkedin-icon.png';
import meetupIcon from '../assets/meetup-icon.svg';
import twitterIcon from '../assets/twitter-icon.png';
import { Icon } from './Icon';
import './Footer.scss';

export class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <div className="Footer--contacts">
          <a href="mailto:malcolm.keeweesiong@gmail.com">
            <Icon>email</Icon>
          </a>
          <a href="https://www.linkedin.com/in/malcolmkee" target="_BLANK">
            <Icon type="image" src={linkedInIcon} alt="LinkedIn" />
          </a>
          <a href="https://github.com/malcolm-kee" target="_BLANK">
            <Icon type="image" src={githubLogo} alt="github" />
          </a>
          <a href="https://twitter.com/Malcolm_Kee" target="_BLANK">
            <Icon type="image" src={twitterIcon} alt="twitter" />
          </a>
          <a
            href="https://www.meetup.com/Kuala-Lumpur-React-JS-Meetup"
            target="_BLANK"
          >
            <Icon type="image" src={meetupIcon} alt="meetup" />
          </a>
        </div>
      </footer>
    );
  }
}
