const { ipcRenderer } = require('electron')

// console.log(ipcRenderer.sendSync('synchronous-message', 'sync ping'))

// await ipcRenderer.sendSync('synchronous-message', 'sync ping')

// Async message handler
ipcRenderer.on('amathreadsearch', (event, arg) => {
    console.log(arg)
})




// let thread_name = 'naqn1p'
// let no_list = ['JJKirsch']
// let accept_MOD = false
// let output_file_name = 'test.txt'


async function fetchthreadusers() {
    // let thread_name = 'naqn1p'
    // let no_list = ['JJKirsch']
    // let accept_MOD = false
    // let output_file_name = 'test.txt'
    // let args = [thread_name, no_list, accept_MOD, output_file_name]

    const subID_element = document.getElementById("submission-id");
    let thread_ID = subID_element.value

    const no_list_element = document.getElementById("no-list");
    let no_list = no_list_element.value.split(", ")

    const accept_mods_element = document.getElementById("accept-mods-yes");
    let accept_mods = accept_mods_element.checked

    const output_path_element = document.getElementById("output-path");
    let output_path = output_path_element.value

    // console.log(thread_ID)
    // console.log(no_list)
    // console.log(accept_mods)
    // console.log(output_path)


    let args = [thread_ID, no_list, accept_mods, output_path]

    let res = await ipcRenderer.sendSync('amathreadsearchsync', args)

    console.log(res)
}




async function send_msg(){
    const users_file = document.getElementById("users-file");
    let users_file_path = users_file.value

    const poap_file = document.getElementById("poap-file");
    let poap_file_path = poap_file.value

    const subreddit_dom = document.getElementById("subreddit");
    let subreddit = subreddit_dom.value

    const subject_dom = document.getElementById("subject");
    let subject = subject_dom.value

    const msg_textbox = document.getElementById("msg-textarea");
    let msg = msg_textbox.value


    console.log(msg)

    let args = [users_file_path, poap_file_path, subreddit, subject, msg]
    let res = await ipcRenderer.sendSync('sendmsgsync', args)

    console.log(res)

}



// Async message sender
// ipcRenderer.send('amathreadsearch', 'asb app')