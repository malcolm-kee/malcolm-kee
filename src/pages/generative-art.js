import React from 'react';
import { RandomGrid } from '../components/art/random-grid';
import { MainContent } from '../components/main-content';
import { Seo } from '../components/Seo';
import { CircleLetter } from '../components/art/circle-letters';

function GenerativeArt() {
  return (
    <>
      <Seo
        title="Generative Art"
        keywords={['random grid', 'generative art']}
      />
      <MainContent className="text-center" style={{ overflow: 'visible' }}>
        <h1>Generative Art</h1>
        <CircleLetter />
        <RandomGrid />
      </MainContent>
    </>
  );
}

export default GenerativeArt;
