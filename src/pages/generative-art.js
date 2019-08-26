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
        <h1>Generative Art</h1>
        <MK />
        <RandomGrid />
      </MainContent>
    </>
  );
}

export default GenerativeArt;
