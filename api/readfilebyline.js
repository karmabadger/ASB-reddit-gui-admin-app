
const fs = require('fs')
const readline = require("readline")




async function readFileLineByLine(filepath) {
    let lines_list = []

    let fileStream
    try {
        fileStream = fs.createReadStream(filepath);

    } catch (error) {
        console.log(error)
    }

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        // console.log(`${line}`);
        lines_list.push(line)
    }

    return lines_list
}


module.exports = {
    readFileLineByLine: readFileLineByLine
}