'use strict'


const dotenv = require('dotenv')

const env = dotenv.config()


myBody = {

}

const userAction = async () => {
    const response = await fetch('https://oauth.reddit.com/r/videos/', {
      method: 'POST',
      body: myBody, // string or object
      headers: {
        'Authorization': env.token_type + ' ' + env.
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
  }