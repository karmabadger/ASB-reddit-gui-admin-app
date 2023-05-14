'use strict';


const { reddit } = require('../api/signin.js')

const fs = require('fs')


// export const reddit;


async function getthread(thread_name, no_list, accept_MOD = false, output_file_name) {

    let thread = reddit.getSubmission(thread_name)


    let authors = new Set()

    let authors_list



    await thread.fetch()

    // thread.author.then(console.log)
    // console.log(thread.author.then())

    let replies = await thread.expandReplies()

    // thread.replies.then(console.log)

    getAuthors(authors, replies.comments, accept_MOD, no_list)


    authors_list = Array.from(authors)
    authors_list = authors_list.filter( author => author != "[deleted]")


    var fs_writer = fs.createWriteStream(output_file_name, {
        flags: 'w'
    })

    for (let author of authors_list) {
        console.log(author)

        fs_writer.write(author)
        fs_writer.write('\n')
    }

    fs_writer.end()
    console.log(authors_list.length)

    return {
        authors_set: authors,
        authors_list: authors_list
    }
}

function getAuthors(authors, replies, accept_MOD = false, no_list) {


    // console.log(typeof replies.comments)
    if (replies == undefined || replies == null) {
        return
    }


    // recursion

    for (let comment of replies) {
        let author = comment.author

        if (accept_MOD) {
            addAuthor(authors, author, false, no_list)

        }else {
            addAuthor(authors, author, check_if_MOD(author, comment), no_list)
        }

        getAuthors(authors, comment.replies, accept_MOD, no_list)
        // console.log(author)
        // console.log(comment.author_flair_text)

    }
}


function addAuthor(authors, author, isMod, no_list) {
    // if name not in list
    if (check_if_in_no_list(author, no_list)) {
        return
    }

    // if not flaired mod
    if (isMod) {
        return
    }

    authors.add(author.name)
}


function check_if_in_no_list(author, no_list) {
    for (let no_el of no_list) {
        if (no_el == author.name) {
            // console.log(author.name)
            return true
        }
    }

    return false
}

function check_if_MOD(author, comment) {
    if (comment.author_flair_richtext != undefined) {
        for (let flair of comment.author_flair_richtext) {
            if (flair.t != undefined) {
                if (flair.t == 'MOD') {

                    // console.log("mod: " + author.name)
                    return true;
                }
            }
        }
    }
    return false
}


function logtest(str) {

    console.log(str)
}




module.exports = {
    reddit: reddit,
    getthread: getthread,
    getAuthors: getAuthors,
    addAuthor: addAuthor,
    check_if_in_no_list: check_if_in_no_list,
    check_if_MOD: check_if_MOD,
    logtest: logtest
}