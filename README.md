# Sandbardle

Welcome to Sandbar's take-home interview: Sandbardle.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Interview Prompt

Create a game similar to [Wordle](https://www.nytimes.com/games/wordle/index.html),
but using a custom word list we provide containing words  that are 2 to 5 unique characters long.
All other rules will remain the same.

The rules of wordle are as follows (from [Wikipedia](https://en.wikipedia.org/wiki/Wordle#Gameplay)):

> ... a random word is chosen which players aim to guess within six tries.
> After every guess, each letter is marked as either green, yellow or gray:
> green indicates that letter is correct and in the correct position,
> yellow means it is in the answer but not in the right position,
> while gray indicates it is not in the answer at all.

For this take-home interview, please create a variant of wordle that allows words that have 2 to 5 unique letters in them, using the list found in `wordlist.txt`.

Your game should include the following:

### Basic Requirements

- random word choice from the list on every game start
- a way to specify an answer by line number in `wordlist.txt`
  - e.g. specifying `80` in the answer specifier field should set the answer to `equip`
- a way to reset the game - clear the current guesses and pick a new random answer.
- a list of 6 guess slots with the correct number of characters for the answer word
  - guessed words should have colors that reflected how it matched to the answer, as per above
- an on-screen keyboard that the user can input guesses onto by clicking the keys

### Stretch Features

- a hard-mode toggle
  - Hard mode requires players to include letters marked as green and yellow in subsequent guesses
- have the on-screen keyboard reflect the state of the clues (keys turn grey, yellow, and green)
- have the on-screen keyboard accept keyboard events in addition to manual mouse clicking

Note: We care more about feature completion and code quality than aesthetic - a well-tested and readable solution that fulfills all (non-stretch) features but is visually simplistic will be considered more highly than a partially complete but shiny one.

You do **not** need to implement the following:

- Game rules (i.e. "How to Play") overlay
- Game metrics (the histogram of number of guesses)
- Dark mode / high contrast mode
- Feedback, report a bug, etc.
- Animations

### FAQ

**Can I use a library? Copy code from other sites?**

Yes, but please attribute any copied code to the original source.

You should not use an existing wordle clone, but can use components.
For example, you can use a library that renders a keyboard on-screen for the keyboard portion of the UI.

**What do I do if a user changes the game settings mid-game?**

Reset the game (guesses & answer)

**What should the layout / interface look like?**

We suggest mimicking the NYTimes's Wordle interface.

**Can I use a component library? CSS framework?**

Yes. You can choose to use whatever you're familiar with.

**Should I include a backend?**

No. The app should be self-contained as a single-page application.

**Can I use something other than react, e.g. Angular, Vue, Svelte, etc.?**

No. Your proficiency with React is a part of what we are evaluating in this interview.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
