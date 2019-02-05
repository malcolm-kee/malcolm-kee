import { Link } from 'gatsby';
import React from 'react';
import { Button } from '../components/Button';
import { ContactForm } from '../components/ContactForm';
import { LandingPageHeader } from '../components/LandingPageHeader';
import { SiteMetadata } from '../components/SiteMetadata';
import { Typography } from '../components/Typography';
import './index.scss';

const LandingPageSection = ({ children }) => (
  <div className="landing-page-section">
    <section className="landing-page-section-content">{children}</section>
  </div>
);

const IndexPage = () => (
  <div className="landing-page">
    <SiteMetadata />
    <div className="landing-page-section">
      <LandingPageHeader />
    </div>
    <LandingPageSection>
      <h2>About Me</h2>
      <Typography>
        Malcolm Kee is a frontend engineer making web applications and enjoy
        doing it.
      </Typography>
      <Typography>
        He conducted workshops in{' '}
        <a
          href="https://www.meetup.com/kl-react/"
          target="_BLANK"
          rel="noopener noreferrer"
        >
          local meetup that he organize
        </a>{' '}
        to teach others on React and web development, as teaching is his passion
        since childhood.
      </Typography>
      <Typography>He is currently learning to play guitar.</Typography>
    </LandingPageSection>
    <LandingPageSection>
      <h2 className="text-right">Projects</h2>
      <div className="text-right">
        <Button color="primary" raised component={Link} to="/projects">
          See My Work
        </Button>
      </div>
    </LandingPageSection>
    <LandingPageSection>
      <h2>Writing</h2>
      <div>
        <Button color="primary" raised component={Link} to="/blog">
          Read Blog
        </Button>
      </div>
    </LandingPageSection>
    <LandingPageSection>
      <h2 className="text-right">Teaching</h2>
      <div className="text-right">
        <Button
          color="primary"
          raised
          component="a"
          href="https://intro-to-react-js.netlify.com/"
          target="_BLANK"
          rel="noopener noreferrer"
        >
          Intro to React
        </Button>
      </div>
    </LandingPageSection>
    <LandingPageSection>
      <h2 className="text-center">Contact Me</h2>
      <div className="landing-page-form-container">
        <ContactForm />
      </div>
    </LandingPageSection>
  </div>
);

export default IndexPage;
