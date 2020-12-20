# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Checkers 

I'm making Checkers, here is where I will keep a log of my tasks:

+ task_0001: convert the current game board to use the useState React Hook 
  + https://reactjs.org/docs/hooks-intro.html
  + https://www.youtube.com/watch?v=dpw9EHDh2bM&feature=emb_logo
  + all_done: project structure looks good too :D
    

+ task_0002: display a red circle for 'r' and a black circle for 'b'
  + the shapes of CSS: https://css-tricks.com/the-shapes-of-css/
  + all_done: the board is now alternating colors, changed the board squares from buttons to
  \<div />'s and made the actual game pieces buttons... everything is colored correctly 
    

+ task_0003: make the game pieces move-able around the board
  + I added the history log successfully
  + right now it just makes the piece null, I need to give it it's move options
  + stopping @ 6:17:39 PM on 12/13/20: 
    + I have the pieces interact-able where I can select a button and it highlights the possible 
    moves but it doesn't disable the other buttons and it craps out if you click \[5]\[7]
    + this stuff is kinda sorta tough :D
  + started back up @ 2:12:31 PM on 12/19/20:
    + more confidence
  + you can select and de-select pieces in traditional checkers fashion
  + now add the movement part
  + ok.. all of that is done.. the piece can move with collision now.. mostly game logic at this point?
  + fix the broken board --> no more out of bounds on the side, top and bottom yes but they'll become kings
  

+ task_0004: eh.. not sure what next
  + ended up just adding menu buttons to utilize the history
  + I guess adding a turn feature is next
  + then the interactions after that? te corner cases if you will...

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
