import {postJson,post,get} from "../axios"

export function shop(id){
    return post('/shop/searchs', { id: id })
}