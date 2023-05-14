const snoowrap = require('snoowrap')
const dotenv = require('dotenv')

const env = dotenv.config()

// var authenticationUrl = snoowrap.getAuthUrl({
//   clientId: 'foobarbazquuux',
//   scope: ['identity', 'wikiread', 'wikiedit'],
//   redirectUri: 'https://example.com/reddit_callback',
//   permanent: false,
//   state: 'fe211bebc52eb3da9bef8db6e63104d3' // a random string, this could be validated when the user is redirected back
// });



// for (let envy in env){
//   console.log(envy)
// }