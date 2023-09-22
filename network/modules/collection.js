import {postJson,post,get} from "../axios"

//user_id
export function getFavor(id){
    return get('/show/favor', { id: id })
}

export function addFavor(favor){
    return postJson('/favor/saves', favor)
}

export function deleteFavor(id){
    return post('/favor/delete', { id: id })
}

//删除新版
export function del(userId,goodsId,id){
    return get('/show/delete', { userId:userId,goodsId:goodsId,id:id })
}