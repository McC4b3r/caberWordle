# caberWordle

This was a take home assessment for a company whose information I will not include in this repo. This is another proof of concept of my abilities as web developer.
This project is deployed [Here](https://caberwordle.vercel.app/), check it out and play around with it if you'd like.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prompt

Create a game similar to [Wordle](https://www.nytimes.com/games/wordle/index.html),
but using a custom word list we provide containing words  that are 2 to 5 unique characters long.
All other rules will remain the same.

The rules of wordle are as follows (from [Wikipedia](https://en.wikipedia.org/wiki/Wordle#Gameplay)):

> ... a random word is chosen which players aim to guess within six tries.
> After every guess, each letter is marked as either green, yellow or gray:
> green indicates that letter is correct and in the correct position,
> yellow means it is in the answer but not in the right position,
> while gray indicates it is not in the answer at all.

For this modified Wordle Clone, a variant of the game that allows words that have 2 to 5 unique letters in them, using the list found in `wordlist.txt` (located in the public dir) has been created. 

Your game includes the following:

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

### Test Coverage
- Tests were written for every component that resides within the components subdirectory of the project. This project has 100% unit test coverage.
- Tests were written for every human interaction as it pertainsn to the Basic Requirements and Stretch Features yielding 100% integration test coverage.
- There are 32 tests total that leverage reusable functions to consolidate test logic, and the tests result in 100% passing status.

## Available Scripts

If you've decided to clone this project down to try it out locally and after installing the project deps with `npm i`, feel free to use the following:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

This take home assessment ultimately concluded with me not moving forward with the company who gave it to me. My one ask for anyone who actually views this code and is a developer is to be a harsh critic and tell me what should be improved. I am on a never-ending journey to improve my skills and would greatly appreciate any criticism to help me make future work like this better. I have decided not to update this code after my submission to preserve the state it was in when it was judged. The one thing I would change after taking time to self reflect is a more robust state management solution aside from my useState implementations in favor of useReducer hooks or with a solution like Redux or Recoil. Thanks for checking this out. 
