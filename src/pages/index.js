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
            A frontend engineer making web applications functional and
            accessible.
          </p>
          <p className="v-space">
            I conducted workshops to teach others on React and web development
            in{' '}
            <OutLink href="https://kl-react.com">
              local meetup that I co-organize
            </OutLink>{' '}
            and occasionally corporate in-house training.
          </p>
          <p className="v-space">Currently learning to play guitar.</p>
        </div>
      </LandingPageSection>
      <div className="landing-page-section-group">
        <LandingPageSection>
          <h2>Works</h2>
          <div>
            <div>
              <Link to="/projects" className="link-highlight animated">
                Projects
              </Link>
            </div>
            <div>
              <Link to="/workshops" className="link-highlight animated">
                Workshops
              </Link>
            </div>
            <div>
              <Link to="/libraries" className="link-highlight animated">
                Libraries
              </Link>
            </div>
          </div>
        </LandingPageSection>
        <LandingPageSection>
          <h2>Writings</h2>
          <div>
            <Link to="/blog" className="link-highlight animated">
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
