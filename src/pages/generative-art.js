import React from 'react';
import { RandomGrid } from '../components/art/random-grid';
import { MK } from '../components/art/mk';
import { MainContent } from '../components/main-content';
import { Seo } from '../components/Seo';

function GenerativeArt() {
  return (
    <>
      <Seo
        title="Generative Art"
        keywords={['random grid', 'generative art']}
      />
      <MainContent className="text-center" style={{ overflow: 'visible' }}>
        <MK />
        <RandomGrid />
      </MainContent>
    </>
  );
}

export default GenerativeArt;
