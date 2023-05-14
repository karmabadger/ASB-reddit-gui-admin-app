

// const snoowrap = require('snoowrap')
// const dotenv = require('dotenv')

// const env = dotenv.config()


const fs = require('fs')


// console.log(env)

function envToString(env) {

    let str = ""

    for (let envy in env.parsed) {
        //   console.log(envy, ": ", env.parsed[envy]);
        str += envy + "=\"" + env.parsed[envy] + "\"\n"
    }

    return str
}


async function saveEnvToFile(env, filepath) {
    let str = envToString(env)

    var fs_writer = fs.createWriteStream(filepath, {
        flags: 'w'
    })

    await fs_writer.write(str)
    await fs_writer.write('\n')

    fs_writer.end()
}




module.exports = {
    envToString: envToString,
    saveEnvToFile: saveEnvToFile
}