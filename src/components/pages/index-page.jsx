import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { ContactForm } from '../ContactForm';
import { LandingPageHeader } from '../landing-page-header';
import { OutLink } from '../OutLink';
import { Seo } from '../Seo';

export const IndexPage = () => (
  <div className="landing-page">
    <Seo />
    <LandingPageHeader />
    <main className="landing-page-content pt-6">
      <LandingPageSection>
        <div className="content-section">
          <SectionHeader>About</SectionHeader>
          <p className="v-space leading-relaxed mb-2">
            A frontend engineer making web applications functional and
            accessible.
          </p>
          <p className="v-space leading-relaxed mb-2">
            I conducted workshops to teach others on React and web development
            in{' '}
            <OutLink className="link" to="https://kl-react.com">
              local meetup that I co-organize
            </OutLink>{' '}
            and occasionally corporate in-house training.
          </p>
          <p className="v-space leading-relaxed mb-2">
            Currently learning to play guitar.
          </p>
        </div>
      </LandingPageSection>
      <div className="max-w-2xl mx-auto pb-4 sm:flex">
        <LandingPageSection className="text-center">
          <SectionHeader>Works</SectionHeader>
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
        <LandingPageSection className="text-center">
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
        <Box title="Contact Me">
          <ContactForm />
        </Box>
      </section>
    </main>
  </div>
);

const LandingPageSection = ({ children, className }) => (
  <section className={cx('py-6 px-4 max-w-xl mx-auto', className)}>
    {children}
  </section>
);

const SectionHeader = ({ children }) => (
  <h2 className="text-2xl font-medium mb-4">{children}</h2>
);

const Box = ({ title, children }) => (
  <div className="max-w-md mx-auto py-1 px-4 bg-gray-100 shadow-lg sm:rounded-lg dark:bg-gray-800">
    <div className="text-center">
      <h2 className="bg-primary-700 text-2xl text-gray-100 inline-block min-w-lg py-2 px-4 relative rounded bottom-3 shadow">
        {title}
      </h2>
    </div>
    {children}
  </div>
);
