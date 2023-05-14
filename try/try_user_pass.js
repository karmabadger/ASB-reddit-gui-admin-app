'use strict';

import snoowrap from 'snoowrap'
import dotenv from 'dotenv'


// const snoowrap = require('snoowrap');


// const dotenv = require('dotenv')

const env = dotenv.config()

// console.log(env.parsed.USERNAME)
// console.log(`useragent: ${process.env.userAgent}, clientID: ${process.env.CLIENTID}, str: ${process.env.CLIENTSECRET}, username: ${process.env.USERNAME}, password: ${process.env.PASSWORD}`)


// const r = new snoowrap({
//     userAgent: 'ASB:app',
//     clientId: env.parsed.CLIENTID,
//     clientSecret: env.parsed.CLIENTSECRET,
//     refreshToken: env.parsed.REFRESHTOKEN
// });


const r = new snoowrap({
    userAgent: 'ASB:app',
    clientId: env.parsed.CLIENTID,
    clientSecret: env.parsed.CLIENTSECRET,
    username: env.parsed.USERNAME,
    password: env.parsed.PASSWORD
});

// console.log(r)
// Extracting every comment on a thread
let thread = r.getSubmission('msg6cp')

// console.log(thread)
// let content = thread.fetch().then(res => console.log(Object.keys(res)))
let content = thread.fetch().then(res => console.log(res))
// replies = thread.expandReplies({limit: 1, depth: 1})


