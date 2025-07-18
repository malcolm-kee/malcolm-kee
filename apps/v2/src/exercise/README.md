# Exercise

Exercises to be injected into MDX by [`CodingExercises`](../components/CodingExercises.astro) component.

## Conventions

- All exercises must be in the folder with the following naming convention: `/:moduleName/:group*/` where `moduleName` and `group` is the props of the `CodingExercises` component.

- The exercises should be named with increasing number, e.g. 01, 02, 03.

- Each exercise should have 3 files:
  - `<name>.js` (exercise to be edited by reader),
  - `<name>.solution.js` (suggested final code for the exercise), and
  - `<name>.test.js` (test case for the exercise, where exercise should fail all, while solution should passes all).

- Exercises can be written in TypeScript, but all the files should be written with same extension.

- JSDoc comment for in the main exercise will becomes the description for the exercise.
