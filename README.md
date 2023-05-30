## __Welcome to Jake Barron's mailchimp technical take home challenge!__

### *About this project:*

This repo actually holds two projects.  the `mc-server` package is the code sent to me by mailchimp to act as the backend for my application.  It is mostly the way it was sent to me save for a few changes to the cors settings and a minor change to a sql query for the sake of my app, otherwise I didn't change much. The other project, `mc-client`, is entirely written by me (and also by `create-react-app`).

Because this repo contains two projects you will need to install two times.  This was necessary because `mc-server` only runs in node12 and I really wanted to create a frontend using all the latest `React` technology, so I used node18 as my environment. Normally I would have split these into 2 repos, but for the sake of ease of downloading and sharing, I combined them.

### Install

 - I highly reccommend you install [nvm](https://www.npmjs.com/package/nvm) to manage node versions
 - next run `nvm install 12` and `nvm install 18` (if you are already running one of these node versions on your machine just install the one you don't have)
 - to install `mc-client`
    - run `nvm use 18`
    - then `cd` into mc-client directory
    - then `npm i`
 - to install `mc-server`
    - run `nvm use 12`
    - then `cd` into mc-server directory
    - then run `npm i`

### Run
to run either of these apps change into their respective directories (where their package.json file is located)
- For mc-server run `nvm use 12` then `npm start`
- For mc-client run `nvm use 18` then `npm start`

### Test
testing is only available for the code I wrote in mc-client to run the tests make sure you are using node18 (`nvm use 18`) then run `npm run test`