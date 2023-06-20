import {postJson,post,get} from "../axios"

export function getCart(id){
    return get('/show/cart', { id: id })
}

export function deleteCart(id){
    return post('/cart/delete', { id: id })
}

export function addCart(Cart){
    return postJson('/cart/saves', Cart)
}

//update
export function addUpdate(id){
    return post('/cart/addupdatas', { id: id })
}

export function minusUpdate(id){
    return post('/cart/jianupdatas', { id: id })
}

export function update(Cart){
    return postJson('/cart/updatas', Cart)
}