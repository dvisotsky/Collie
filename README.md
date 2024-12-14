Collie - Classroom Management Web App

Welcome to Collie, a web application designed to streamline classroom management for educators and enhance the learning experience for students.

# Current To Do

- Dynamic routing for groups
  - each group card at /group/index should link to its edit page
- Group edit page
  - hook up to edit endpoint
  - hook up to delete endpoint

# Background Info

You will need a decent grasp of HTML, CSS, and JavaScript to be able to contribute to this project.
If you're ever confused or don't know something, you're one of us. Welcome.

For Collie, both backend and frontend are written in JavaScript.

- [Express.js](https://expressjs.com/) is our framework for the backend.
- The frontend is vanilla js (no framework or library), but we use [Vite](https://vite.dev/) to help with development servers and building the frontend.

# Getting started

You'll need the following software to get a local development server running:
[Installing npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is the first step.

Backend:

- node.js
- npm

Frontend:

- node.js
- vite
- npm

# Functionality Outline

Things required for the core of the app.
Each of the following models will be a table in the database that the frontend will be able to display and request changes to through our express.js backend.

## Staff

Owners and operators of [Groups](#groups).

To Do:

- [ ] View
- [ ] Create/Update
- [ ] Delete

## Groups

Connect Staff and Members to each other.
A Group must have Staff, but is not required to have Members.

To Do:

- [x] View
- [ ] Update
- [x] Create
- [ ] Delete

## Members

Participants of a [Group](#groups), led by the Group's [Staff](#staff)

To Do:

- [ ] View
- [ ] Create/Update
- [ ] Delete

## Scorecard

Connected to a [Member](#members) to keep track of various metrics.
Is created by Staff.

To Do:

- [ ] View
- [ ] Create/Update
- [ ] Delete
