import {
	postJson,
	post,
	get
} from "../axios"

export function stuffRemarks(params) {
	return get('/show/stuffmessage',params)
}

export function animalRemarks(params) {
	return get('/show/animalmessage',params)
}

