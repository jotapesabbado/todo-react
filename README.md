You're right! Let's include a section about `store.jsx` in the README. Here is the updated version:

---

# Todo App

This is a Todo list application built with React, Redux, and Vite. This README provides information on how to set up, develop, test, and build the project.

## Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download Node.js [here](https://nodejs.org/).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jotapesabbado/todo-react.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repository
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Runs ESLint to analyze the code for problems.\
Ensure your code adheres to the defined style rules and best practices.

### `npm run preview`

Runs a preview of the production build.\
This is useful for checking if the production build is working correctly.

### `npm run test`

Runs tests using Vitest.\
This includes all the tests defined in the project.

### `npm run coverage`

Runs tests and generates a code coverage report.\
The report will be generated in HTML format and can be viewed by opening the generated file in a browser.

## Project Structure

- `src/`: Main directory for the application's source code.
  - `components/`: Reusable React components.
  - `pages/`: Application pages.
  - `slice/`: Redux slices for state management.
  - `store.jsx`: Redux store configuration and setup.
  - `App.jsx`: Main application component.
  - `index.jsx`: Application entry point.
