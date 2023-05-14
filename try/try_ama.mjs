import { reddit } from '../api/signin.mjs'

import fs from 'fs'


var fs_writer = fs.createWriteStream('rubic_ama_users.txt', {
    flags: 'w'
})

let thread = reddit.getSubmission('naqn1p')

let no_list = ['JJKirsch']



let authors = new Set()

let authors_list



async function getthread() {

    await thread.fetch()

    // thread.author.then(console.log)
    // console.log(thread.author.then())

    let replies = await thread.expandReplies()

    // thread.replies.then(console.log)

    getAuthors(replies.comments)


    authors_list = Array.from(authors)

    for (let author of authors_list){
        console.log(author)

        fs_writer.write(author)
        fs_writer.write('\n')
    }

    fs_writer.end()
    console.log(authors_list.length)

    
}

function getAuthors(replies){


    // console.log(typeof replies.comments)
    if(replies == undefined || replies == null){
        return
    }


    // recursion
    
    for (let comment of replies) {
        let author = comment.author

        addAuthor(author, check_if_MOD(author, comment))

        getAuthors(comment.replies)
        // console.log(author)
        // console.log(comment.author_flair_text)

    }
}


function addAuthor(author, isMod){
    // if name not in list
    if(check_if_in_no_list(author)){
        return
    }

    // if not flaired mod
    if(isMod){
        return
    }

    authors.add(author.name)
}


function check_if_in_no_list(author){
    for (let no_el of no_list){
        if(no_el == author.name){
            // console.log(author.name)
            return true
        }
    }

    return false
}

function check_if_MOD(author, comment){
    if(comment.author_flair_richtext != undefined){
        for (let flair of comment.author_flair_richtext){
            if(flair.t != undefined){
                if(flair.t == 'MOD'){

                    // console.log("mod: " + author.name)
                    return true;
                }
            }
        }
    }
    return false
}




await getthread()