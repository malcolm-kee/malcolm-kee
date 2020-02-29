---
title: Testing React Component
description: Test the behavior of a React component
date: '2020-02-25'
objectives:
  - write tests to verify behavior of React component
  - use React Testing Library to abstract common setup
  - write tests to verify asynchronous behavior of React component
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
    target: { value: 'Malcolm' },
  });

  expect(onChangeValueHandler).toHaveBeenCalledTimes(1);
  expect(onChangeValueHandler).toHaveBeenCalledWith('Malcolm');
});
// highlight-end
```

<Exercise title="Exercise">

Write tests to verify behaviors of `SelectField`.

</Exercise>

## Test Asynchronous Behavior of React Component

```jsx fileName=src/components/spinner.spec.jsx
import { render } from '@testing-library/react';
import React from 'react';
import { Spinner } from './spinner';

test(`renders without props will show instantly`, () => {
  const { getByRole } = render(<Spinner />);

  expect(getByRole('progressbar')).not.toBeNull();
});
```

Now let's add a test to verify that is `delayShow` is provided, nothing will be shown in the beginning.

```jsx fileName=src/components/spinner.spec.jsx
...

test(`renders with delay will show after wait`, () => {
  const { getByRole } = render(<Spinner delayShow={200} />);

  expect(getByRole('progressbar')).toBeNull();
});
```

Oops! The test fails!

This is because all `getBy*` queries will throw error if not elements match it, which would make debugging easier.

Luckily, there are another set of queries that will not fail if no elements match, which starts with `queryBy*`. Let's replace our `getByRole` accordingly:

```jsx fileName=src/components/spinner.spec.jsx
...

test(`renders with delay will show after wait`, () => {
  const { queryByRole } = render(<Spinner delayShow={200} />); // highlight-line

  expect(queryByRole('progressbar')).toBeNull(); // highlight-line
});
```

Now that we verify that nothing is shown in the beginning, let's verify that the spinner will be shown after the delay.

But how do we wait the delay?

Fortunately (again!), there is (yet) another set of queries starts with `findBy*`. This set of queries will returns a `Promise` once a match is found.

Let's use it in our test and change our test to an `async` function.

```jsx fileName=src/components/spinner.spec.jsx
...

test(`renders with delay will show after wait`, async () => { // highlight-line
  const { queryByRole, findByRole } = render(<Spinner delayShow={200} />); // highlight-line

  expect(queryByRole('progressbar')).toBeNull();

  // highlight-start
  const spinner = await findByRole('progressbar');

  expect(spinner).not.toBeNull();
  // highlight-end
});
```

<Exercise title="Exercise">

Write tests to verify behaviors of `ShareButton`.

</Exercise>

[queries]: https://testing-library.com/docs/dom-testing-library/api-queries
