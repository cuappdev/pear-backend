# Pear Backend

[![GitHub release](https://img.shields.io/github/release/cuappdev/pear-backend.svg)](https://github.com/cuappdev/pear-backend/releases)
[![GitHub contributors](https://img.shields.io/github/contributors/cuappdev/pear-backend.svg)](https://github.com/cuappdev/pear-backend/graphs/contributors)
[![Build Status](https://travis-ci.com/cuappdev/pear-backend.svg?branch=master)](https://travis-ci.com/cuappdev/pear-backend)

A project by [Cornell AppDev](http://cornellappdev.com), a project team at Cornell University.
Documentation on routes and usage is [here](http://pear-backend.cornellappdev.com/api/v1/docs/).

## Installation

This project uses Node.js [See installation guide](https://nodejs.org/en/download/) and Typescript [See installation guide](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

Clone the project with

```
git clone https://github.com/cuappdev/pear-backend.git
```

After cloning the project, `cd` into the new directory and install dependencies with

```
npm install
```

After opening the project in your IDE, you can run it using

```
npm start run
```

### Setting up database:

Make sure `PostgreSQL` is installed. After installation, start `PostgreSQL` and connect to the database by running

```
psql pear
```

Run the command

```
CREATE DATABASE pear;
```

If you get a database error, upon running `npm start run` and you already created the database, try

```
DROP DATABASE pear;
CREATE DATABASE pear;
```

### Environment Variables:

It is recommended to use [`direnv`](https://direnv.net). To set up, run the following:

```bash
cp envrc.template .envrc
```

## Configuration (optional)

We recommend using ESLint and Prettier for linting/formatting. If you are using VSCode, they can be downloaded directly through the Extensions panel.
Run ESLint on the codebase with `npm run lint` and Prettier with `npm run format`.
