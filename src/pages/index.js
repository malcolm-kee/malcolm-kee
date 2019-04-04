import { Link } from 'gatsby';
import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { LandingPageBackground } from '../components/LandingPageBackground';
import { LandingPageHeader } from '../components/LandingPageHeader';
import { OutLink } from '../components/OutLink';
import { SiteMetadata } from '../components/SiteMetadata';
import { Typography } from '../components/Typography';
import './index.scss';

const LandingPageSection = ({ children }) => (
  <section className="landing-page-section-content">{children}</section>
);

const IndexPage = () => (
  <div className="landing-page">
    <SiteMetadata />
    <LandingPageHeader />
    <div className="landing-page-content">
      <LandingPageSection>
        <h2>About</h2>
        <Typography>
          Malcolm Kee is a frontend engineer making web applications and enjoy
          doing it.
        </Typography>
        <Typography>
          He conducted workshops in{' '}
          <OutLink href="https://www.meetup.com/kl-react/">
            local meetup that he organize
          </OutLink>{' '}
          to teach others on React and web development, as teaching is his
          passion since childhood.
        </Typography>
        <Typography>He is currently learning to play guitar.</Typography>
      </LandingPageSection>
      <div className="landing-page-section-group">
        <LandingPageSection>
          <h2 className="text-right">Projects</h2>
          <div className="text-right">
            <Link to="/projects" className="link-primary">
              See My Works
            </Link>
          </div>
        </LandingPageSection>
        <LandingPageSection>
          <h2>Writing</h2>
          <div>
            <Link to="/blog" className="link-primary">
              Read Blog
            </Link>
          </div>
        </LandingPageSection>
        <LandingPageSection>
          <h2 className="text-right">Teaching</h2>
          <div className="text-right">
            <div>
              <OutLink
                href="https://intro-to-react-js.netlify.com/"
                className="link-primary"
              >
                Intro to React
              </OutLink>
            </div>
            <div>
              <OutLink
                href="https://intro-to-react-js-v2.netlify.com/"
                className="link-primary"
              >
                Intro to React v2
              </OutLink>
            </div>
            <div>
              <OutLink
                href="https://intro-to-web-dev.netlify.com/"
                className="link-primary"
              >
                Intro to Web Dev
              </OutLink>
            </div>
          </div>
        </LandingPageSection>
      </div>
      <LandingPageBackground Tag="section">
        <LandingPageBackground className="landing-page-form-container">
          <h2 className="text-center">Contact Me</h2>
          <ContactForm />
        </LandingPageBackground>
      </LandingPageBackground>
    </div>
  </div>
);

export default IndexPage;
