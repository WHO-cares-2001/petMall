// import {postJson,post} from "../axios"

// export function login(params){
//     return postJson('/user/login',params)
// }

// export function save(params){
//     return postJson('/user/save',params)
// }
// export function list(){
//     return postJson('/user/list')
// }
// export function update(params){
//     return postJson('/user/update',params)
// }
// export function page(params){
//     return post('/user/page',params)
// }
// export function deleteByIds(params){
//     return post('/user/deleteByIds',params)
// }

// export function userInfornation(params) {
// 	return post('/user/searchbyid', params)
// }

import {
	postJson,
	post
} from "../axios"

export function login(params) {
	return postJson('/user/login', params)
}

export function update(params) {
	return postJson('/user/updatas', params)
}
export function save(params) {
	return postJson('/user/saves', params)
}
export function deleteByIds(params) {
	return post('/user/deleteByIds', params)
}
export function userInfornation(params) {
	return post('/user/searchbyid', params)
}