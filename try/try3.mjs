
// console.log("hello")
import { reddit } from '../api/signin.mjs'


async function run() {
    let sub = reddit.getSubreddit("AltStreetBets")

    // console.log(sub)

    let msg =

        `Dear Altist,

Here is your link to claim your NFT from the [Rubic AMA](https://www.reddit.com/r/AltStreetBets/comments/naqn1p/rubic_team_is_here_ask_us_anything/) on r/AltStreetBets.

All official POAPs from ASB can be seen [here](https://app.poap.xyz/scan/0xF65fB449ECa1ef8a43e7507ab7E83365DBd308c1).

*May your bags be heavy*

The mods of r/AltStreetBets

`

    let link = 'http://POAP.xyz/claim/0b5w66'

    let timeout = 0

    let notSent = true

    while (notSent) {

        // await setTimeout(() => {
        //     notSent = false;

        //     reddit.composeMessage({
        //         to: 'wenxuan27',
        //         subject: "1 ASB Rubic AMA NFT!",
        //         text: msg + link,
        //         fromSubreddit: "ethereum"
        //     }).catch((res) => {
        //         console.log("error: " + res)

        //         notSent = true;
        //         timeout = 1000;
        //     })

        // }, timeout)

        notSent = false;

        // try {

        await reddit.composeMessage({
            to: 'wenxuan27',
            subject: "1 ASB Rubic AMA NFT!",
            text: msg + link,
            fromSubreddit: "ethereum"
        }).catch((res) => {
            console.log("error: " + res)

            notSent = true;
            timeout = 1000;
        })
        // } catch (error) {
        //     console.log("error: " + res)

        //     notSent = true;
        //     timeout = 1000;
        // }


        if (notSent) {
            await sleep(1000)

        }


        console.log(notSent)
    }






}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

run()