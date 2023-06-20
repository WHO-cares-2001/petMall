import {postJson,post,get} from "../axios"

export function getAnimalbytype(name){
    return get('/show/animalbytype', { name: name })
}

