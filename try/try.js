'use strict';
const snoowrap = require('snoowrap');


const dotenv = require('dotenv')

dotenv.config()


// console.log(`keys: ${process.env.KEYS}, str: ${process.env.STR}`)


const r = new snoowrap({
    userAgent: 'daman',
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    refreshToken: process.env.REFRESHTOKEN
});


// Extracting every comment on a thread
let thread = r.getSubmission('kw8tu3')


console.log(thread.body)


