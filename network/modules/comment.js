import {postJson,post,get} from "../axios"

//单个增加评论
export function addComment(comment){
    return postJson('/message/saves', comment)
}