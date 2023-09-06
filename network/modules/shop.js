import {postJson,post,get} from "../axios"

export function shop(id){
    return post('/shop/searchs', { id: id })
}

export function getstuff(id){
    return get('/show/stuffbyshopid', { id: id })
}

export function getanimal(id){
    return get('/show/animalbyshopid', { id: id })
}