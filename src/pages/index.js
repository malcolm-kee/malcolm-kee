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
          <SectionHeader>Writings</SectionHeader>
          <div>
            <Link to="/blog" className="link-highlight animated">
              Read Blog
            </Link>
          </div>
          <div>
            <Link to="/today-i-learnt" className="link-highlight animated">
              Today I Learnt
            </Link>
          </div>
        </LandingPageSection>
      </div>
      <section>
        <div className="max-w-md mx-auto py-1 px-2 bg-gray-100 shadow-lg sm:rounded-lg">
          <div className="text-center">
            <h2 className="bg-primary-700 text-xl text-gray-100 inline-block min-w-lg py-2 px-4 relative rounded bottom-2 shadow">
              Contact Me
            </h2>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  </div>
);

const SectionHeader = ({ children }) => <h2 className="text-lg">{children}</h2>;

export default IndexPage;
