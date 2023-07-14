---
title: 'Use Overload to Type Dynamic Function Signature'
pubDate: 8 Oct 2019
topics: ['typescript']
---

Sometimes, you want to make your function return different result depends on the parameter.

Take, for example the following React custom hooks:

```ts
export function usePreloadImage(imageSrc: string, eager = true) {
  /* if it is eager,
  then set loadIt to true, else make loadIt false */
  const [loadIt, setLoadIt] = React.useState(eager);

  React.useEffect(() => {
    if (imageSrc && loadIt) {
      // if loadIt is true, load the image
      const image = new Image();
      image.src = imageSrc;
    }
  }, [loadIt, imageSrc]);

  if (eager) {
    /* if eager, this hooks should NOT return
    a function because the image already loaded */
    return;
  }

  /* if not eager, returns a function
   that user can call to start load the image */
  return () => setLoadIt(true);
}
```

<aside>

The custom hook is useful to preload image to minimize layout jumping when image load, e.g. when you conditionally render image when user interacts (e.g. in an accordion).

</aside>

To use it:

```tsx
export const Page = () => {
  // this image will be loaded when on mount
  usePreloadImage('http://placecorgi.com/200/200');

  // this image only load when you hover over the button
  const loadLargeImage = usePreloadImage('http://placecorgi.com/300/300', false);

  return (
    <div>
      <p>Open DevTools (F12) Network Tabs to verify</p>
      <button
        onMouseEnter={() => {
          // typecheck as typescript infer this may be undefined
          // highlight-next-line
          if (loadLargeImage) {
            loadLargeImage();
          }
        }}
      >
        Hover Me
      </button>
    </div>
  );
};
```

See it in action:

```jsx noInline live previewOnly
function usePreloadImage(imageSrc, eager = true) {
  const [loadIt, setLoadIt] = React.useState(eager);

  React.useEffect(() => {
    if (imageSrc && loadIt) {
      const image = new Image();
      image.src = imageSrc;
    }
  }, [loadIt, imageSrc]);

  if (eager) {
    return;
  }
  return () => setLoadIt(true);
}

const Page = () => {
  // this image will be loaded when on mount
  usePreloadImage('http://placecorgi.com/200/200');

  // this image only load when you hover over the button
  const loadLargeImage = usePreloadImage('http://placecorgi.com/300/300', false);

  return (
    <div>
      <p>Open DevTools (F12) Network Tabs to verify</p>
      <button
        onMouseEnter={() => {
          loadLargeImage();
        }}
      >
        Hover Me
      </button>
    </div>
  );
};

const Container = () => {
  const [key, setKey] = React.useState(0);

  return (
    <div>
      <button onClick={() => setKey(key + 1)} className="btn btn-raised btn-primary">
        Reload App
      </button>
      <Page key={key} />
    </div>
  );
};

render(<Container />);
```

This works, but I dislike that as a user of the custom hook, I need to do a check on the type of the returned callback of the custom hook. We know that when we pass `false` as second parameter to the `usePreloadImage` hook, it will definitely return a function. Now we do that type checking not because it is necessary, but just to shut TypeScript up.

This is because TypeScript is not that smart to infer that logic; it only sees that there are two possible outcomes of `usePreloadImage` function, which is either `undefined` or a function.

We need to teach TypeScript to recognize that patterns by overload the function:

```ts
// highlight-start
export function usePreloadImage(imageSrc: string, eager?: true): void;
export function usePreloadImage(imageSrc: string, eager: false): () => void;
// highlight-end
export function usePreloadImage(imageSrc: string, eager = true) {
  const [loadIt, setLoadIt] = React.useState(eager);

  React.useEffect(() => {
    if (imageSrc && loadIt) {
      const image = new Image();
      image.src = imageSrc;
    }
  }, [loadIt, imageSrc]);

  if (eager) {
    return;
  }

  return () => setLoadIt(true);
}
```

Now TypeScript can infer the returned type correctly.
