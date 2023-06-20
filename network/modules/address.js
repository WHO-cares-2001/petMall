import {
	postJson,
	post
} from "../axios"

export function saves(params) {
	return postJson('/address/saves', params)
}

export function addressList(params) {
	return post('/address/searchs', params)
}

export function update(params) {
	return postJson('/address/updatas', params)
}
export function deleteByIds(params) {
	return post('/address/updatass', params)
}