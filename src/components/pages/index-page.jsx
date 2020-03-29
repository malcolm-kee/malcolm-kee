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
      <div className="lg:grid grid-cols-3 gap-2">
        <LandingPageSection className="col-span-2 lg:text-right lg:mr-0 lg:pr-0">
          <div className="content-section">
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
              Lifelong learner and programming craftman.
            </p>
          </div>
        </LandingPageSection>
        <div className="max-w-4xl mx-auto pb-4 px-2 lg:max-w-full">
          <LandingPageSection>
            <SectionHeader>Works</SectionHeader>
            <ul className="flex justify-around">
              <li className="mx-1">
                <Link to="/projects" className="link-highlight animated">
                  Projects
                </Link>
              </li>
              <li className="mx-1">
                <Link to="/workshops" className="link-highlight animated">
                  Workshops
                </Link>
              </li>
              <li className="mx-1">
                <Link to="/libraries" className="link-highlight animated">
                  Libraries
                </Link>
              </li>
            </ul>
          </LandingPageSection>
          <LandingPageSection className="text-center">
            <SectionHeader>Writings</SectionHeader>
            <ul className="flex justify-around">
              <li>
                <Link to="/blog" className="link-highlight animated">
                  Read Blog
                </Link>
              </li>
              <li>
                <Link to="/today-i-learnt" className="link-highlight animated">
                  Today I Learnt
                </Link>
              </li>
            </ul>
          </LandingPageSection>
        </div>
        <section className="col-start-2 col-end-3">
          <Box title="Contact Me" className="lg:mr-0">
            <ContactForm />
          </Box>
        </section>
      </div>
    </main>
  </div>
);

const LandingPageSection = ({ children, className }) => (
  <section className={cx('py-6 px-4 max-w-xl mx-auto', className)}>
    {children}
  </section>
);

const SectionHeader = ({ children }) => (
  <h2 className="text-2xl font-medium mb-4 text-center">{children}</h2>
);

const Box = ({ title, children, className }) => (
  <div
    className={cx(
      'max-w-md mx-auto py-1 px-4 bg-gray-100 shadow-lg sm:rounded-lg dark:bg-gray-800',
      className
    )}
  >
    <div className="text-center">
      <h2 className="bg-primary-700 text-2xl text-gray-100 inline-block min-w-lg py-2 px-4 relative rounded bottom-3 shadow">
        {title}
      </h2>
    </div>
    {children}
  </div>
);
