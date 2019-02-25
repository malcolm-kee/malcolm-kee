import { Link } from 'gatsby';
import React from 'react';
import { Button } from '../components/Button';
import { ContactForm } from '../components/ContactForm';
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
        <div className="landing-page-center-gap">
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
        </div>
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
          <div>
            <Button
              raised
              component={OutLink}
              href="https://intro-to-react-js.netlify.com/"
            >
              Intro to React
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              raised
              component={OutLink}
              href="https://intro-to-react-js-v2.netlify.com/"
            >
              Intro to React v2
            </Button>
          </div>
        </div>
      </LandingPageSection>
      <LandingPageSection>
        <h2 className="text-center">Contact Me</h2>
        <div className="landing-page-form-container">
          <ContactForm />
        </div>
      </LandingPageSection>
    </div>
  </div>
);

export default IndexPage;
