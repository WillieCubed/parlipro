# ParliPro

![Vercel](https://vercelbadge.vercel.app/api/WillieCubed/parlipro)

_Parliamentary procedure made easy_

## Overview

### About

ParliPro is an interactive tool to conduct meetings using Robert's Rules of
Order in realtime. It consists of a meeting runner view, a companion projector
view, and a participant view.

### Roadmap

- Motion tracking
- Attendance tracking
- Vote tracking
- Convert to progressive web app
  - Add offline support

## Development

### Getting Started

Prerequisites:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/download/) v16 or greater and NPM (included in your Node.js installation)

It is recommended to use [Visual Studio Code](https://code.visualstudio.com/)
as your code editor
to take advantage of some custom settings set by the project, but this is not
required.

Simply clone this project:

```
git clone https://github.com/WillieCubed/parlipro.git
cd parlipro
```

Now you can open it in your code editor of choice.

### Setting up Environment Variables

This project uses [Firebase](https://firebase.google.com) for back-end
functionality. The source code does not include these configuration values, so
they will need to be set up.

First, create a `.env.local` file at the root of the project with the following
contents:

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

Now go to the [Firebase console](https://console.firebase.google.com) and create
a new project. This requires a Google account.

Follow the on-screen instructions to create a new web project. You can name it
whatever you want (e.g.: UTD SG ParliPro). You should eventually see text that
looks like this:

```js
const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "[project-id].firebaseapp.com",
  databaseURL: "https://[project-id]-default-rtdb.firebaseio.com",
  projectId: "[project-id]",
  storageBucket: "[project-id].appspot.com",
  messagingSenderId: "8928596234",
  appId: "1:8928596234:web:...",
};
```

For each line in the configuration object (e.g. `apiKey`), copy the value inside
the quotes to the corresponding line starting with `REACT_APP_FIREBASE_` in your
`.env.local` file (e.g. copy the value for `apiKey` to the line starting with
`REACT_APP_FIREBASE_API_KEY=`, and so on).

Now you have all the environment variables needed for the application. If you
are deploying the server, you can use these same values as needed.

### Making Changes

This is a React app. To start the local development server, open a terminal and
run:

```shell
npm start
```

After compilation, you should be able to access the website in a web browser at
the URL provided in your terminal (usually [localhost:3000](http://localhost:3000)).

### Other Quality of-life Stuff

If you use VS Code, you may want to make debugging a little easier by doing the
following.

In a `.env.local` file, add the following line:

```
REACT_EDITOR=code
```

### Deployment

The website is set to automatically deploy to [parlipro.vercel.app][live-website]
whenever changes are pushed to the `main` branch.

To deploy a copy of this project to your own [Vercel][vercel] account, use the button
below. It will prompt you to provide environment variables to deploy the
project. Follow the instructions in the "Setting up Environment Variables" to
obtain the values.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWillieCubed%2Fparlipro&env=REACT_APP_FIREBASE_API_KEY,REACT_APP_FIREBASE_AUTH_DOMAIN,REACT_APP_FIREBASE_DATABASE_URL,REACT_APP_FIREBASE_PROJECT_ID,REACT_APP_FIREBASE_STORAGE_BUCKET,REACT_APP_FIREBASE_MESSAGING_SENDER_ID,REACT_APP_FIREBASE_APP_ID)

[vercel]: https://vercel.com
[live-website]: https://parlipro.vercel.app
