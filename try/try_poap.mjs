
// console.log("hello")
import { reddit } from '../api/signin.mjs'

import fs from 'fs'
import readline from "readline"


let poap_links_path = "C:\\Users\\wenxu\\Projects\\api\\asb\\list/links_Rubic.txt"




async function processLineByLine() {
    const fileStream = fs.createReadStream(poap_links_path);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`${line}`);
    }
}

processLineByLine();

// let sub = reddit.getSubreddit("AltStreetBets")


// reddit.composeMessage({
//     to: 'GoodJobNL',
//     subject: "test asb",
//     text: 'test asb',
//     fromSubreddit: sub
// })



