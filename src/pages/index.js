import { Link } from 'gatsby';
import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { LandingPageHeader } from '../components/LandingPageHeader';
import { OutLink } from '../components/OutLink';
import { Seo } from '../components/Seo';
import './index.scss';

const LandingPageSection = ({ children }) => (
  <section className="landing-page-section-content">{children}</section>
);

const IndexPage = () => (
  <div className="landing-page">
    <Seo />
    <LandingPageHeader />
    <main className="landing-page-content">
      <LandingPageSection>
        <div className="content-section">
          <h2>About</h2>
          <p className="v-space">
            Malcolm Kee is a frontend engineer making web applications and enjoy
            doing it.
          </p>
          <p className="v-space">
            He conducted workshops in{' '}
            <OutLink href="https://kl-react.com">
              local meetup that he organize
            </OutLink>{' '}
            to teach others on React and web development, as teaching is his
            passion since childhood.
          </p>
          <p className="v-space">He is currently learning to play guitar.</p>
        </div>
      </LandingPageSection>
      <div className="landing-page-section-group">
        <LandingPageSection>
          <h2>Works</h2>
          <div>
            <div>
              <Link to="/projects" className="link-highlight">
                Projects
              </Link>
            </div>
            <div>
              <Link to="/workshops" className="link-highlight">
                Workshops
              </Link>
            </div>
            <div>
              <Link to="/libraries" className="link-highlight">
                Libraries
              </Link>
            </div>
          </div>
        </LandingPageSection>
        <LandingPageSection>
          <h2>Writings</h2>
          <div>
            <Link to="/blog" className="link-highlight">
              Read Blog
            </Link>
          </div>
        </LandingPageSection>
      </div>
      <section>
        <div className="landing-page-form-container">
          <h2 className="text-center">Contact Me</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  </div>
);

export default IndexPage;
