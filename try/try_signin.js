const snoowrap = require('snoowrap')
const dotenv = require('dotenv')

const env = dotenv.config()

const scopesjs = require('../api/scopes')

const http = require('http');

const baseUrl = 'https://www.reddit.com/api/v1/';
const request = require('request-promise').defaults({ json: true, baseUrl });
const port = 65010;
const expected_redirect_uri = `http://localhost:${port}/authorize_callback`;


const express = require('express')
const app = express()
// const port = 3000


async function main() {






    let scopes_list = await scopesjs.getScopesList()

    // console.log(scopes_list)

    let state = 'fe211bebc52eb3da9bef8db6e63104d3'



    var authenticationUrl = snoowrap.getAuthUrl({
        clientId: env.parsed.CLIENTID,
        scope: scopes_list,
        redirectUri: expected_redirect_uri,
        permanent: true,
        state: state // a random string, this could be validated when the user is redirected back
    });

    console.log(authenticationUrl)

    app.get('/authorize_callback', (req, res) => {

        console.log(req.query)


        let code = req.query.code

        console.log(code)

        snoowrap.fromAuthCode({
            code: code,
            userAgent: env.parsed.USERAGENT,
            clientId: env.parsed.CLIENTID,
            redirectUri: expected_redirect_uri
        })


        // console.log(res)
        res.send('done')
    })



    // app.get('/authorize_callback', (req, res) => {

    //     console.log(req.query)


    //     let code = req.query.code

    //     snoowrap.fromAuthCode({
    //         code: code,
    //         userAgent: 'My app',
    //         clientId: 'env.parsed.CLIENTID',
    //         redirectUri: 'example.com'
    //     })


    //     // console.log(res)
    //     res.send('done')
    // })


    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`)
    })

}



main()