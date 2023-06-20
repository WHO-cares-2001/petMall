import {postJson,post,get} from "../axios"

export function showStuff(){
    return get('/show/stuff')
}
