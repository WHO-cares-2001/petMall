import {
	postJson,
	post,
	get
} from "../axios"

export function showTypeList() {
	return get('/show/type')
}
export function showType(params) {
	return get('/show/typebyanimal?name='+params)
}
export function searchByType(params) {
	return post('/animal/searchbytype',params)
}