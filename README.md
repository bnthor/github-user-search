# Hello there 👋

I created this repo to take the [frontend technical test](https://github.com/fulll/hiring/blob/master/Frontend/github-user-search-intermediaire-senior.md)

First part of the test (FizzBuzz) can be seen [on codeSandbox](https://codesandbox.io/s/fizzbuzz-benjamin-rethore-45hy6v?file=/src/index.ts).

I also had fun making a CSS FizzBuzz, also [on codeSandbox](https://codesandbox.io/s/css-fizzbuzz-benjamin-rethore-c2wmd8?file=/styles.css).

## Available Scripts

In the project directory, you can run:

- `npm start`
- `npm test`
- `npm run build`
- `npm run eject`

## What have been done,

I tried to stick to the brief :

- I wrote this little app with create-react-app, without adding dependencies
- It is responsive
- Hitting gitHub's API with fetch when typing in the search form (debounced to avoid too many requests)
- When rate is exceeded, I'm only logging an error in the console.
- Empty state (no results) is displayed when form is empty & when there's no results
- Added a checkbox that selects/unselects all results
- Added the duplicate/delete selection actions
- Added an edit-mode toggle in the header, which shows the checkboxes/actions when checked
- Created a few unit tests

From a design perspective, I didn't stick completely to the mockups, there was an opportunity to shorten the toolbar.