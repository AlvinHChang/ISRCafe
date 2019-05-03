
## ISR Cafe

This app allows the display of a queue to be linked with a form submitted through Google Forms and handled through Google Sheets

## The Sheet
`https://docs.google.com/spreadsheets/d/1LC-ZQXFZdf3rad0CVvmN0oL5bfmP2GZEhR-UN4MuN8o/edit?usp=sharing`

This form shows all the orders
In 'Form Responses 1' tab, it shows the timestamp, name, drinks, and order status of each drink.
The second to fourth sheets are Google Sheets formulas written to filter status for the 'OrderStatus' tab
The 'OrderStatus' tab is the tab that is sent to the frontend.

## How to Use

Clone it and modify the config.js to the respective Google Sheet you have formatted.

Most of the information should be used in the similar format as the Google Sheet provided, otherwise, it might not show correct information.

For the Barista:
-Click Ready once the drink is ready for pick up, the drinks displayed with move to the right side
-Click Received once the person receives the drink, the order will then disappear from the right side

## Examples
You can use this form to try putting in orders:

`https://forms.gle/2hTsQheWX59pJ5oH9`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
