---
title: Testing React Component
description: Test the behavior of a React component
date: '2020-02-25'
objectives:
  - write tests to verify behavior of React component
  - use React Testing Library to abstract common setup
  - write tests to verify asynchronous behavior of React component
  - the right way of using snapshot testing
---

## Render a React Component to Verify Its Behavior

Let's test `TextField` component (at `src/components/text-field.jsx`) by renders it and check its content.

Add a file `text-field.spec.jsx` with following content:

```jsx fileName=src/components/text-field.spec.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { TextField } from './text-field';

test(`renders TextField`, () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextField label="Age" type="number" />, div);
  expect(div.querySelector('label').textContent).toBe('Age');
  expect(div.querySelector('input').type).toBe('number');
});
```

## Use React Testing Library to Write Maintainable Tests

```bash
yarn add -D @testing-library/react
```

```jsx fileName=src/components/text-field.spec.jsx
import { render } from '@testing-library/react';
import React from 'react';
import { TextField } from './text-field';

test(`renders TextField`, () => {
  const { getByLabelText } = render(<TextField label="Age" type="number" />);
  expect(getByLabelText('Age').type).toBe('number');
});
```

- `getByLabelText` is one of the [many queries][queries] that React Testing Library provides to make DOM assertion easier.
- Note that I no longer assert content of `label` and `input` separately. Instead, by using `getByLabelText` queries, I've implicitly asserted that:

  - `"Age"` text is rendered.
  - `<label>` tag that contains `Age` text is associated to an `input`, ensuring the screen reader can associate them correctly.

<aside>

You may dislikes the implicitness of the query, but think of the alternative: you have to assert Age is visible, get the `for` attribute for the label, and check it against the `id`. And slowly your tests have so many code that its intent is no longer clear. I rather improve my test readability by introducing some abstractions.

Of course, the implicitness may cause it harder to debug, but in practice, most of the time I just need to log out the content of the rendered content by using the `debug` utility provided by `render` function, and the issue is clear.

You can use the `debug` utility like this:

```jsx
const { debug } = render(<TextField label="Age" type="number" />);

debug();
```

</aside>

Now that we've tested the rendering of the component, let's test the behavior of the component.

## Test Behavior of React Component (Event Listener)

The behavior of component that is indicated here is how component responds to event.

Let's add another test case for your TextField.

```jsx fileName=src/components/text-field.spec.jsx
import { fireEvent, render } from '@testing-library/react'; // highlight-line
import React from 'react';
import { TextField } from './text-field';

test(`renders TextField`, () => {
  const { getByLabelText } = render(<TextField label="Age" type="number" />);
  expect(getByLabelText('Age').type).toBe('number');
});

// highlight-start
test(`TextField invoke onChangeValue when input value change`, () => {
  const onChangeValueHandler = jest.fn();
  const { getByLabelText } = render(
    <TextField label="Name" onChangeValue={onChangeValueHandler} />
  );

  fireEvent.change(getByLabelText('Name'), {
    target: 'Malcolm',
  });

  expect(onChangeValueHandler).toHaveBeenCalledTimes(1);
  expect(onChangeValueHandler).toHaveBeenCalledWith('Malcolm');
});
// highlight-end
```

## Test Asynchronous Behavior of React Component

## Snapshot Testing: What and When to Use It

[queries]: https://testing-library.com/docs/dom-testing-library/api-queries
