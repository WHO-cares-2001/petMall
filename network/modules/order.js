import {
	postJson,
	post,
	get
} from "../axios"

export function add(Orders){
    return postJson('/orders/saves', Orders)
}

export function addDetails(OrderDetails){
    return postJson('/orderdetails/saves', OrderDetails)
}

export function updateDetails(OrderDetails){
    return postJson('/orderdetails/update', OrderDetails)
}

export function getByStates(state){
    return get('/show/bystateorders', { state: state })
}

export function getAll(){
    return get('/show/allorders')
}
