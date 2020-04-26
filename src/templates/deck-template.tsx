import * as React from 'react';
import { useLayout } from '../layouts/layout-context';
import { Slide } from '../components/slide';

export default function DeckTemplate() {
  useLayout('none');

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Slide
      selected={activeIndex}
      onTransitionRequest={(ev) => setActiveIndex(ev.nextIndex)}
    >
      <div>
        1<h1>Hullo</h1>
      </div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Slide>
  );
}
