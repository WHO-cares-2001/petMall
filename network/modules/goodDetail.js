import {postJson,post,get} from "../axios"

export function showStuff(){
    return post('/stuff/searches')
}

//查商店
export function shop(id){
    return post('/shop/searchs',{id:id})
}

export function stuffById(id){
    return post('/stuff/searchbyid',{id:id})
}

export function animalById(id){
    return post('/animal/searchbyid',{id:id})
}

export function videoById(id){
    return post('/video/searchs',{id:id})
}