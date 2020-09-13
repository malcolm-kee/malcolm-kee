---
title: 'React fundamentals'
---

## Rendering

React is used to describe the UI.

ReactDOM is used to use the description to render it.

To render UI with React, we need:

- a React element (described with JSX)
- a dom element (get by `document.getElementById` or `document.querySelector`)

Let's get rid of JSX

- change JSX to `React.createElement`
- React is just JavaScript, because it's just function call
- that means you can pass any JS variable into `React.createElement`, and doing weird things like passing a IIFE into React.createElement
- since you can be as weird as you want, it means you can be as abstract as you want.

- The signature of `React.createElement`:

  - after first 2 parameter, all the remaining parameters will be the children of the element.
  - other than string, the children of `React.createElement` can also be another react element.
  - the second parameter is called `props`, which you can treat it as HTML attributes
  - most props is just like HTML attributes, with few edge cases. E.g. for style, instead of passing a string, react expects an object. The reason for that is object is easier to compose and remove.

- Let's go back from `React.createElement` back to JSX:

  - Note that with JSX, `{}` means go back to JavaScript. Without that everything in it will be treated as string.
  - as such, the `style` props will have the double curly `{{}}`. Note that there is no special meaning of double curly in React. The first `{}` mean go back to JavaScript, while the second one is the object we pass to `style` props.

- Let's import `FaHome` from `react-icons/fa` and render it. `FaHome` is a react component. A react components wrapped some React elements that we can use. Let's see how we can create a react component like `FaHome`.

- To define a react component, just create a function that will returns some react elements. Then you can use it just like HTML element like `div` or `span`. With that we can render similar elements multiple times.

- But we're not satisfied with render the component multiple times. Rendering a react component with entirely is not what we want. We want to make react component customizable.

  - Let's think about the native `button` element, we can pass `classname` to it to make it style differentl. Same goes for React component, we should be able to customize our component by passing different props.
  - The way to do that is the react component (which is a function), accepts a parameter (which is usually called `props`). We can returns different react elements based on the props we receives in the component.

- Making component more flexible.

  - Our current abstraction (`icon` and `text` props) is not a very flexible abstraction because it dictates it must have an icon and the text. We want to allow others to pass any thing as they wish and this component only responsible to render the button and style it accordingly like this:

  ```jsx
  <PrimaryButton>
    <FaPlus />
    Add
  </PrimaryButton>
  ```

  - To allow that, we can use a special props in React: `children`.

    - `children` is anything that you pass within the open and closed tag of a JSX.
    - React will combine multiple elements into single `children` props.
    - Technically you can still pass `children` by name, like `<PrimaryButton children="Add">`. Conceptually what React do is to move the elements from within the tags into this `children` props.

Data can flows from parent to children with props. But how do we pass the data from children to parent? For example, how can we allows `PrimaryButton` to inform the parent that it has been clicked?

- To allows that to happen, we pass function as props. Then the children component can call the function.

```jsx
const PrimaryButton = (props) => (
  <button onClick={() => props.onClick()}>{props.children}</button>
);

<PrimaryButton onClick={() => console.log('button has been clicked')}>
  <FaPlus />
  Add
</PrimaryButton>;
```

- Some people call those props with function as value as "callback props", some call it "event props", but fundamentally there are just another props. React call everything as props because function is just another type of variable and React accept any type of variable as props.

- Note that if we don't pass the props into the underlying `button` component, React will not magically recognize that it should pass down the `onClick` props. It's just JavaScript at the end of the day.

We can create not just DOM event like `onClick`, we can also create custom event like `onKeyboardClick`, or even `<CustomerForm onSuccess={(customer) => {}}>`, which give us a higher level of abstraction to understand our application.

Let's do some code-along with some libraries to get a taste of how it feels.

## State

React is a declarative library.

When we say declarative, it means we just need to talk about "what", instead of "how".

The metaphor of "what" and "how" is the difference of the old and new Myvi.

In my old Myvi, I need to control the fan and the coldness of the air. If the outer temperature changes, I need to tweaks those two control to make myself comfortable. But what I actually want is just to maintain temperature at the level I want.

In the new Myvi, you just need to set a temperature, and the cooling system will just auto-adjust the temperature accordingly. There is no more tweaking, you just say, I want "21 C", then boom, it will figure it out itself.
