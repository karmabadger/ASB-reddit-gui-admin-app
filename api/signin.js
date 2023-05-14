'use strict';

const snoowrap = require('snoowrap')
const dotenv = require('dotenv')

const env = dotenv.config()


// export const reddit = new snoowrap({
//     userAgent: 'ASB:app',
//     clientId: env.parsed.CLIENTID,
//     clientSecret: env.parsed.CLIENTSECRET,
//     username: env.parsed.USERNAME,
//     password: env.parsed.PASSWORD
// });


const reddit = new snoowrap({
    userAgent: 'ASB:app',
    clientId: env.parsed.CLIENTID,
    clientSecret: env.parsed.CLIENTSECRET,
    refreshToken: env.parsed.REFRESHTOKEN
});

reddit.config({
    continueAfterRatelimitError: true,
    requestDelay: 100,
});


module.exports = {
    reddit: reddit
}
