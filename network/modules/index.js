import {postJson,post,get} from "../axios"

export function showAnimal(){
    return get('/show/animal')
}