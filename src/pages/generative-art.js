import React from 'react';
import { RandomGrid } from '../components/art/random-grid';
import { MainContent } from '../components/main-content';

function GenerativeArt() {
  return (
    <MainContent className="text-center">
      <RandomGrid />
    </MainContent>
  );
}

export default GenerativeArt;
