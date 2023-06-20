import {postJson,post,get} from "../axios"

export function searchStuff(name){
    return post('/stuff/search', { name: name })
}

export function searchAnimal(name){
    return post('/animal/search', { name: name })
}