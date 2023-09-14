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

export function getByStates(id,state){
    return get('/show/bystateorders', {id:id,state: state })
}
export function getById(id){
    return get('/show/byordersid', {id:ids})
}

export function getAll(){
    return get('/show/allorders')
}
