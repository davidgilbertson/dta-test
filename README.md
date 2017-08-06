# DTA Front End Assignment - Progress Bars

This project can be viewed at https://davidgilbertson.github.io/dta-test

To run this project locally in dev mode, type `npm start`.
To run tests, type `npm test`.

## Project structure
Components are grouped into directories, and each directory contains the component file,
a CSS file and a test file.

There is also a `services.js` file that houses the services to fetch the data, and a `utils.js`
file that contains a util to cleanse the incoming data.

## Browser support
Tested on:
- IE11
- Edge
- Chrome on Windows
- Chrome on Android
- Safari on iOS

`flexbox` is used which means support is limited to [these browsers](http://caniuse.com/#feat=flexbox)
`fetch` is also used but this is polyfilled so doesn't affect browser support.

## Accessibility
The page is fully keyboard navigable.

## Time taken
This took just under four hours.

## create-react-app
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
The rationale behind this is that create-react-app ships with all the best tools, e.g.
- React
- Jest
- eslint

And saves an hour or two of setup time without any compromises.
