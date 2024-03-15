# NoBS: Change Your Life Through Workout

<p style="text-align: center;">
  <img src="frontend/public/Nobswhite.png" alt="Logo" />
</p>

## Description

Fitness goals are a large part of many lives, yet many individuals frequently encounter difficulties in finding a reliable mechanism to stay on track. This challenge is magnified when these goals conflict with educational pursuits or career milestones. NoBS. caters to increasing self-discipline and personal accountability through creation of personalized fitness regimes, collaboration with friends, and fun ways to share progress and stay motivated.

## Get Started

1. Signup or Signin using a Google account
2. Either create a new group or enter a group ID to join an existing group
3. Create your plan on your own, or ask the chatbot for workout suggestions
4. Track your daily tasks done through confirming each task and see them on Friend Activity board
5. Nudge your friends to motivate them.

## Features

- Personalized Goals: Use the interactive chatbot that offers tailored goals and suggestions!
- Metrics & Leaderboard: Monitor daily progress and compare achievements with friends!
- Group Accountability: Track your friend's progress and nudge your friends for group accountability!

## Setup

First, clone the repository

### `git clone https://github.com/faizihaer/NoBS.git`

Move into the project directory to install node.js packages

### `cd NoBs`

First move into the frontend folder and install the node.js packages

```
cd frontend
npm install
```

Then go back to the project directory, move into the backend folder and install the node.js packages

```
cd ..
cd backend
npm install
```

## Environment Setup
Note: Wifi should be UCLA_WIFI or UCLA_VPN (accessible through SEASnet).

First move into the frontend folder and create an .env file

```
cd frontend
```

In the .env file, now add the following with your own credentials

```
REACT_APP_GOOGLE_CLIENT_ID=<google client id>
REACT_APP_GOOGLE_CLIENT_SECRET=<google client secret>
REACT_APP_EMAIL_USERNAME=<application email address>
REACT_APP_API_KEY=<API key>
```

Then go back to the project directory, move into the backend folder and create an .env file

```
cd ..
cd backend
```

In the .env file, now add the following with your own credentials

```
MONGODB_URI=mongodb+srv://<username>:<password>@nobscluster.89sjqjn.mongodb.net/NoBS_Users
PORT=4000
GOOGLE_CLIENT_ID=<google client id>
GOOGLE_CLIENT_SECRET=<google client secret>
EMAIL_SERVICE=gmail
EMAIL_USERNAME=<application email address>
EMAIL_PASSWORD=<google auth password>
```

## Start up the Server

Open up a terminal

```
cd backend
npm start
```

In another terminal without closing the first one

```
cd frontend
npm start
```

Note: backend must be started before frontend. 
