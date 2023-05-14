const fs = require('fs')

const { readFileLineByLine } = require("./readfilebyline")


let scopespath = "./scopes.txt"

async function getScopesJSON() {
    let scope_arr = await readFileLineByLine(scopespath)
    
    return scope_arr[0]
}


async function getScopesObj(){
    let scopesJSON = await getScopesJSON()

    let scopeObject = JSON.parse(scopesJSON)

    return scopeObject
}

async function getScopesList(){
    let scopeObject = await getScopesObj()

    let scopes_arr = []

    for (let scope in scopeObject){
        scopes_arr.push(scope)
    }


    return scopes_arr
}

module.exports = {
    getScopesJSON: getScopesJSON,
    getScopesObj: getScopesObj,
    getScopesList: getScopesList
}