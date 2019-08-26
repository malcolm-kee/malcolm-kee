import React from 'react';
import { RandomGrid } from '../components/art/random-grid';
import { MainContent } from '../components/main-content';
import { Seo } from '../components/Seo';

function GenerativeArt() {
  return (
    <>
      <Seo
        title="Generative Art"
        keywords={['random grid', 'generative art']}
      />
      <MainContent className="text-center">
        <RandomGrid />
      </MainContent>
    </>
  );
}

export default GenerativeArt;
