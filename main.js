'use strict';


const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const { ipcMain } = require('electron')

const { reddit, getthread, getAuthors, addAuthor, check_if_in_no_list, check_if_MOD, logtest } = require('./api/ama')

const { readFileLineByLine } = require('./api/readfilebyline')


const sleep = require('./api/sleep')

let win


let html_dir = "/assets/html/"

// console.log(path.join(__dirname + html_dir, 'index.html'))
function createWindow() {
   win = new BrowserWindow({
      width: 1000,
      height: 600,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         enableRemoteModule: true,
      },
      icon: __dirname + '/assets/img/community_icon.png'
   });
   win.loadURL(url.format({
      pathname: path.join(__dirname + html_dir, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}



// Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, arg) => {
   console.log(arg)

   // Event emitter for sending asynchronous messages
   event.sender.send('asynchronous-reply', 'async pong')
})


// Event handler for asynchronous incoming messages
ipcMain.on('amathreadsearch', (event, args) => {
   console.log(args)


   let authors = ama(args)

   // Event emitter for sending asynchronous messages
   event.sender.send('amathreadsearch', 'test success!')
})


// Event handler for synchronous incoming messages
ipcMain.on('amathreadsearchsync', (event, args) => {
   console.log(args)

   // logtest(arg)

   let authors = ama(event, args)

   // // Synchronous event emmision
   // event.returnValue = 'amathreadsearchsync success!'
})



// Event handler for synchronous incoming messages
ipcMain.on('amathreadsearchsync', (event, args) => {
   console.log(args)

   // logtest(arg)

   let authors = ama(event, args)

   // // Synchronous event emmision
   // event.returnValue = 'amathreadsearchsync success!'
})


// Event handler for synchronous incoming messages
ipcMain.on('sendmsgsync', (event, args) => {
   console.log(args)

   // logtest(arg)

   let authors = send_msg(event, args)

   // // Synchronous event emmision
   // event.returnValue = 'sendmsgsync success!'
})



app.on('ready', createWindow);



async function ama(event, args) {
   let returnValue = await getthread(...args)
   // Synchronous event emmision
   event.returnValue = 'amathreadsearchsync success!'
   return returnValue
}


async function send_msg(event, args) {

   let users_list
   try {
      users_list = await readFileLineByLine(args[0])
      // console.log(users_list)
   } catch (error) {
      console.log(error)
   }

   let poap_list 
   try {
      poap_list = await readFileLineByLine(args[1])
      // console.log(poap_list)
   } catch (error) {
      console.log(error)
   }


   let sub = reddit.getSubreddit(args[2])
   let msg_subject = args[3]

   let poap_index = 0


   for await (let user of users_list) {

      // console.log("|" + user + "|")

      let link = poap_list[poap_index]
      let msg = args[4]
      let fullmsg = msg + 
`
      
#` + link
      
      // let fullmsg2 = fullmsg.replace(/(?:\r\n|\r|\n)/g, '<br>');

      console.log(fullmsg)
      
      let timeout = 120000;

      let notSent = true

      while (notSent) {

          notSent = false;

          await reddit.composeMessage({
              to: user,
              subject: msg_subject,
              text: fullmsg,
              fromSubreddit: sub
          }).catch((res) => {
              console.log("error: " + res)

              notSent = true;
          })


          if (notSent) {
              await sleep(timeout)
          }

          console.log(poap_index +": "  +  notSent)
      }


      poap_index++
  }


  console.log(poap_index)


   // let returnValue = await getthread(...args)
   // Synchronous event emmision
   event.returnValue = 'amathreadsearchsync success!'
   // return returnValue
}
