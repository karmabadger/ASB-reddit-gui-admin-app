
// console.log("hello")
import { reddit } from '../api/signin.mjs'

import fs from 'fs'
import readline from "readline"


let poap_links_path = "C:\\Users\\wenxu\\Projects\\api\\asb\\list/links_Rubic.txt"

let ama_users_path = "C:\\Users\\wenxu\\Projects\\api\\asb\\ASBApp\\rubic_ama_users.txt"


let poap_links_list = []
let ama_users_list = []

async function processPoapLineByLine() {
    const fileStream = fs.createReadStream(poap_links_path);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        // console.log(`${line}`);
        poap_links_list.push(line)
    }
}


async function processUsersLineByLine() {
    const fileStream = fs.createReadStream(ama_users_path);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        // console.log(`${line}`);
        ama_users_list.push(line)
    }
}

async function send_poap_links() {
    await processPoapLineByLine();
    await processUsersLineByLine();

    let sub = reddit.getSubreddit("AltStreetBets")

    let poap_index = 0

    for await (let user of ama_users_list) {

        // console.log("|" + user + "|")

        let msg =

            `Dear Altist,

Here is your link to claim your NFT from the [Rubic AMA](https://www.reddit.com/r/AltStreetBets/comments/naqn1p/rubic_team_is_here_ask_us_anything/) on r/AltStreetBets.

All official POAPs from ASB can be seen [here](https://app.poap.xyz/scan/0xF65fB449ECa1ef8a43e7507ab7E83365DBd308c1).

*May your bags be heavy*

The mods of r/AltStreetBets

`


        let msg2 = `

note: if you have any issues with the poap link, please let us know.
sorry if you already got this message, we are trying to automate it`



        let link = poap_links_list[poap_index]

        let timeout = 0

        let notSent = true

        while (notSent) {

            notSent = false;

            await reddit.composeMessage({
                to: user,
                subject: "ASB Rubic AMA NFT!",
                text: msg + link + msg2,
                fromSubreddit: sub
            }).catch((res) => {
                console.log("error: " + res)

                notSent = true;
                timeout = 120000;
            })


            if (notSent) {
                await sleep(timeout)

            }


            console.log(poap_index +": "  +  notSent)
        }



        // reddit.composeMessage({
        //     to: user,
        //     subject: "ASB Rubic AMA NFT!",
        //     text: msg + poap_links_list[poap_index],
        //     fromSubreddit: sub
        // })

        poap_index++
    }


    console.log(poap_index)


}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


send_poap_links()

// let sub = reddit.getSubreddit("AltStreetBets")


// reddit.composeMessage({
//     to: 'GoodJobNL',
//     subject: "test asb",
//     text: 'test asb',
//     fromSubreddit: sub
// })



