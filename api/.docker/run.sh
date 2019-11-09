#!/bin/bash
# Install deps and Run migrations
npm install

npm run migrate

npm start

# nodemon -L -e js,json app.js
