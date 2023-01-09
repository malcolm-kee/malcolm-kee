import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { LinkButton } from '../components/Button';
import { JQueryLogo } from '../components/jquery-logo';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { WorkshopLandingPageFooter } from '../components/workshop/workshop-landing-page-footer';
import { WorkshopLandingSeo } from '../components/workshop/workshop-landing-seo';

const BecomingAJQueryNinja = () => {
  const { workshopsYaml } = useStaticQuery(graphql`
    {
      workshopsYaml(id: { eq: "becoming-a-jquery-ninja" }) {
        ...WorkshopLandingSeo
        name
        description
      }
    }
  `);

  return (
    <>
      <WorkshopLandingSeo {...workshopsYaml} />
      <WorkshopLandingPageBanner>
        <div>
          <div className="w-56 mx-auto lg:mt-6">
            <JQueryLogo />
          </div>
          <h1 className="my-6 text-3xl text-center text-white">
            {workshopsYaml.name}
          </h1>
          <p className="px-4 my-6 leading-relaxed max-w-lg text-gray-400 text-justify mx-auto">
            {workshopsYaml.description}
          </p>
          <div className="my-2 py-2 text-center">
            <LinkButton
              to="/becoming-a-jquery-ninja/introduction/"
              color="primary"
              minWidth="widest"
              className="text-2xl"
            >
              Start
            </LinkButton>
          </div>
        </div>
      </WorkshopLandingPageBanner>
      <WorkshopLandingPageFooter />
    </>
  );
};

export default BecomingAJQueryNinja;
