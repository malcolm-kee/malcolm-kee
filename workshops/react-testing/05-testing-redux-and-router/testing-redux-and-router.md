---
title: Testing with Redux or React Router
description: Test the behavior of a React component that use Redux or React Router
date: '2020-02-25'
objectives:
  - write tests to verify behavior of React component that use Redux
  - write tests to verify behavior of React component that use React Router
  - the right way of using snapshot testing
---

## Test Redux Connected Components

Let's try to test `PaymentForm` in `src/modules/cart/components/payment-form.jsx`:

```jsx fileName=payment-form.spec.jsx
import { render } from '@testing-library/react';
import React from 'react';
import { PaymentForm } from './payment-form';

test(`PaymentForm can be rendered`, () => {
  render(<PaymentForm />);
});
```

Woah! The test fails!

```bash
FAIL  src/modules/cart/components/payment-form.spec.jsx (5.568s)
× PaymentForm can be rendered (69ms)

● PaymentForm can be rendered

  Could not find "store" in the context of "Connect(PaymentFormView)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(PaymentFormView) in connect options.
```

As explained in the error message, this is because we use `connect` function from `redux`, and it expects there is a `Provider` as ancestor of the component. Let's proceed to do that:

```jsx fileName=payment-form.spec.jsx
import { configureStore } from '@reduxjs/toolkit'; // highlight-line
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux'; // highlight-line
import { rootReducer } from '../../root-reducer'; // highlight-line
import { PaymentForm } from './payment-form';

test(`PaymentForm can be rendered`, () => {
  const store = configureStore({ reducer: rootReducer }); // highlight-line

  render(
    // highlight-next-line
    <Provider store={store}>
      <PaymentForm />
      {/* highlight-next-line */}
    </Provider>
  );
});
```

And the test passes!

Before we proceed further, let's abstract the setup so we can use it everytime our test involves components requiring redux store.

Add a `src/lib/test-util.jsx` file with the following content:

```jsx fileName=src/lib/test-util.jsx
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { rootReducer } from '../modules/root-reducer';

export const renderWithStateMgmt = ui => {
  const store = configureStore({
    reducer: rootReducer,
  });

  const renderResult = render(<Provider store={store}>{ui}</Provider>);

  return {
    ...renderResult,
    store,
  };
};
```

- `renderWithStateMgmt` accepts React element as its parameter, just like `render` from React Testing Library.
- In addition of returning all results from `render`, `renderWithStateMgmt` also returns the redux store, so your tests can dispatch additional actions as you wish.

Then we can use it in our test like this:

```jsx fileName=payment-form.spec.jsx
import React from 'react';
import { renderWithStateMgmt } from '../../../lib/test-util'; // highlight-line
import { PaymentForm } from './payment-form';

test(`PaymentForm can be rendered`, () => {
  renderWithStateMgmt(<PaymentForm />); // highlight-line
});
```

And our test still passes!

The next test will be filling up the form. Before we do that, let's check the rendered UI by using the `debug` helper:

```jsx fileName=payment-form.spec.jsx
...
test(`PaymentForm can be filled`, () => {
  const { debug } = renderWithStateMgmt(<PaymentForm />);

  debug();
});
```

And we realize, the payment amount is 0.

This is because in actual scenario, customer need to add some product into cart before they able to see the payment form. Therefore, we need some way to simulate the behavior.

Let's modify `renderWithStateMgmt` to supports this use case:

```jsx fileName=src/lib/test-util.jsx
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { rootReducer } from '../modules/root-reducer';

// highlight-next-line
export const renderWithStateMgmt = (ui, { actions = [] } = {}) => {
  const store = configureStore({
    reducer: rootReducer,
  });

  actions.forEach(action => store.dispatch(action)); // highlight-line

  const renderResult = render(<Provider store={store}>{ui}</Provider>);

  return {
    ...renderResult,
    store,
  };
};
```

Then in our test:

```jsx fileName=payment-form.spec.jsx
import React from 'react';
import { renderWithStateMgmt } from '../../../lib/test-util';
import { cartActions } from '../cart.slice'; // highlight-line
import { PaymentForm } from './payment-form';

...

test(`PaymentForm can be filled`, () => {
  // highlight-start
  const { debug } = renderWithStateMgmt(<PaymentForm />, {
    actions: [
      cartActions.addItem({
        product: {
          id: 1,
          price: 200,
        },
      }),
    ],
  });
  // highlight-end

  debug();
});
```

And the amount is displayed! Let's add an assertion:

```jsx fileName=payment-form.spec.jsx
import React from 'react';
import { renderWithStateMgmt } from '../../../lib/test-util';
import { cartActions } from '../cart.slice'; // highlight-line
import { PaymentForm } from './payment-form';

...

test(`PaymentForm can be filled`, () => {
  // highlight-next-line
  const { getByText } = renderWithStateMgmt(<PaymentForm />, {
    actions: [
      cartActions.addItem({
        product: {
          id: 1,
          price: 200,
        },
      }),
    ],
  });

  expect(getByText('RM 200.00')).not.toBeNull(); // highlight-line
});
```

Then simulate user filling up the form:

```jsx fileName=payment-form.spec.jsx
import { fireEvent } from '@testing-library/react'; // highlight-line
import React from 'react';
import { renderWithStateMgmt } from '../../../lib/test-util';
import { cartActions } from '../cart.slice';
import { PaymentForm } from './payment-form';
...

test(`PaymentForm can be filled`, () => {
  // highlight-next-line
  const { getByText, getByLabelText } = renderWithStateMgmt(<PaymentForm />, {
    actions: [
      cartActions.addItem({
        product: {
          id: 1,
          price: 200,
        },
      }),
    ],
  });

  expect(getByText('RM 200.00')).not.toBeNull();
  // highlight-start
  expect(getByText('Pay').disabled).toBe(true);

  fireEvent.change(getByLabelText('Card Number'), {
    target: {
      value: '5572336646354657',
    },
  });
  fireEvent.change(getByLabelText('Name'), {
    target: {
      value: 'James Bond',
    },
  });
  fireEvent.change(getByLabelText('Valid Thru'), {
    target: {
      value: '12/25',
    },
  });
  fireEvent.change(getByLabelText('CVC'), {
    target: {
      value: '123',
    },
  });

  expect(getByText('Pay').disabled).toBe(false);
  // highlight-end
});
```

## Test Components that Use React Router

Let's continue the last test by clicking the Pay button:

```jsx fileName=payment-form.spec.jsx
...

test(`PaymentForm can be filled`, () => {
  ...
  expect(getByText('Pay').disabled).toBe(false);

  fireEvent.click(getByText('Pay')); // highlight-line
});
```

## Snapshot Testing: What and When to Use It
