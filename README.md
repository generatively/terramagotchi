# Terramagotchi
Terramagotchi is a web app which aims to educate people about the cycles in nature and the processes which underlie them. The project is separated into 3 parts: The main application, the remote application, and the Firebase code.
* The main application is where the environment is simulated. It includes includes a simulation of nutrient and water transfer between soil, plants, and organisms, as well as water evaporation and condensation.
* The remote application is the interface that will enable users to authenticate and communicate to Firebase through an external device.
* The Firebase code is for deploying Firebase Cloud Functions that connect the main application and remote through a Firestore database.

## Technologies

### Languages

[![javascript](https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en/JavaScript) 
[![css](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en/CSS) [![postcss](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)](https://postcss.org/)
[![html](https://img.shields.io/badge/HTML-e34c26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en/HTML)

### Libraries

[![p5](https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&logo=p5.js&logoColor=white)](https://p5js.org/)
[![tailwind](https://img.shields.io/badge/tailwind_css-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![firebase](https://img.shields.io/badge/firebase-F57C00?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

| Name                    | version        | terramagotchi | terramagotchi development | remote | remote development | firebase | firebase development |
|-------------------------|----------------|---------------|---------------------------|--------|--------------------|----------|----------------------|
| p5                      | 1.4.2          | &#x2611;      |                           |        |                    |          |                      |
| simplex-noise           | 4.0.0          | &#x2611;      |                           |        |                    |          |                      |
| html-webpack-plugin     | 5.5.0          |               | &#x2611;                  |        | &#x2611;           |          |                      |
| webpack                 | 5.74.0         |               | &#x2611;                  |        | &#x2611;           |          |                      |
| webpack-cli             | 4.10.0         |               | &#x2611;                  |        | &#x2611;           |          |                      |
| webpack-dev-server      | 4.10.1         |               | &#x2611;                  |        | &#x2611;           |          |                      |
| crypto-random-string    | 5.0.0          | &#x2611;      |                           |        |                    |          |                      |
| firebase                | 9.12.1         | &#x2611;      |                           |&#x2611;|                    |&#x2611;  |                      |
| qrcode                  | 1.5.1          | &#x2611;      |                           |        |                    |          |                      |
| css-loader              | 6.7.1          |               |                           |        | &#x2611;           |          |                      |
| postcss                 | 8.4.17         |               |                           |        | &#x2611;           |          |                      |
| postcss-loader          | 7.0.1          |               |                           |        | &#x2611;           |          |                      |
| postcss-preset-env      | 7.8.2          |               |                           |        | &#x2611;           |          |                      |
| style-loader            | 3.3.1          |               |                           |        | &#x2611;           |          |                      |
| tailwindcss             | 3.1.8          |               |                           |        | &#x2611;           |          |                      |
| tw-elements             | 1.0.0-alpha12  |               |                           |&#x2611;|                    |          |                      |
| firebase-admin          | 10.0.2         |               |                           |        |                    |&#x2611;  |                      |
| firebase-functions      | 3.18.0         |               |                           |        |                    |&#x2611;  |                      |
| firebase-functions-test | 0.2.0          |               |                           |        |                    |          |&#x2611;              |


## Usage - Instructions on How to Install and Setup the Project.

All dependencies have been listed above. See [Libraries](#libraries)

Prior to using these applications, you must have Node.js (with npm) installed on your machine.

As there are three sub-packages, each one must be installed/used separately.

Before building the project create a `.env` file at the root of the project containing the following variables.
```
// Firebase Variables
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=

// Instance Generation
RANDOM_INSTANCE="TRUE"

QR_DISPLAY_MODE="1"
```
The Firebase variables can be found in the General tab of Project settings in a Firebase web project.

To enable random instance generation, leave RANDOM_INSTANCE as "TRUE", otherwise remove this variable.

QR_DISPLAY_MODE sets the default display mode of the QR Code. 0 is hidden (Default), 1 is Overlayed, 2 is Fully covering the environment.

The display mode can be toggled with the period `.` key once running.

### Terramagotchi (Main Application)

Navigate to `./terramagotchi/` From here run the following commands:

#### Install

```
npm install
```

#### Development Server

```
npm run dev
```

You can now access the application by navigating to `http://localhost:9000/` in your browser.

#### Build

```
npm run build
```

This will build the application. It can then be accessed in the `dist` folder. To run the application, open the `index.html` file (found in said `dist` folder) in your browser.

### Terramagotchi-Firebase (Cloud functions)
To deploy this code, a new Firebase project must be created prior to deployment. This can be done by following [Firebase Docs](https://firebase.google.com/docs/web/setup).

Firebase tools is required to be installed globally using npm before deploying to the Firebase project.
```
npm install -g firebase-tools
firebase login
```
Once logged in to an authorised Google account, you can install dependencies and deploy to the Firebase.
```
cd terramagotchi-firebase/functions
npm install
cd ..
npm install
firebase deploy
```
Global function variables within Firestore can be created in `!global/variables`, currently only `user_cooldown` is supported.

### Terramagotchi-Remote (User Remote)

Navigate to `./terramagotchi-remote/` From here run the following commands:

#### Install

```
npm install
```

#### Development Server

```
npm run dev
```

You can now access the application by navigating to `http://localhost:9001/` in your browser.

#### Build

```
npm run build
```

This will build the application. It can then be accessed in the `dist` folder. To run the application, open the `index.html` file (found in said `dist` folder) in your browser.

#### Hosting

The webpacked files can be hosting anywhere once built. For the remote to route properly the dist files for `terramagotchi-remote` must be routed with `/remote`.

If using firebase to host you can use the following `firebase.json` to route it correctly.
```js
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
      "rewrites": [ {
      "source": "**",
      "destination": "/index.html"
    }, {
      "source": "/remote",
      "destination": "/remote/index.html"
    }]
  }
}
```

## Usage Examples (if available).

This project is an application which is made to be shown in an art gallery setting.

## URL of the Website Where the Project Has Been Deployed

https://terramagotchi.web.app  
https://terramagotchi.web.app/remote

## Future Plan (Ideas for Future releases)

- Temperature and oxygen levels which affect the water and nutrient cycles. A high temperature would result in more transpiration. Oxygen levels would imply an additional carbon cycle system.
- Larger diversity of plants and organisms. Currently we have 3 plants, (lavendar, dandelion and kauri tree,) and one organism, (a worm).

## Acknowledgements (if any) - You Can List Tutorials Used, Projects Referred To, People Consulted Etc.

- [The Coding Train on YouTube](https://www.youtube.com/c/TheCodingTrain)
