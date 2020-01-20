import React from 'react';
import { RandomGrid } from '../components/art/random-grid';
import { MainContent } from '../components/main-content';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import { CircleLetter } from '../components/art/circle-letters';

function GenerativeArt({ location }) {
  return (
    <>
      <Seo
        title="Generative Art"
        pathname={location.pathname}
        keywords={['random grid', 'generative art']}
      />
      <MainContent className="text-center" style={{ overflow: 'visible' }}>
        <PageTitleContainer title="Generative Art" />
        <div className="px-4">
          <CircleLetter />
          <RandomGrid />
        </div>
      </MainContent>
    </>
  );
}

export default GenerativeArt;
