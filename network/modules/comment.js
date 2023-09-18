import {postJson,post,get} from "../axios"

//单个增加评论
export function addComment(comment){
    return postJson('/message/saves', comment)
}

//根据订单编号查该订单内的所有评论
export function getCommentsByNumber(number){
    return get('/show/numbermessage', { number: number })
}
