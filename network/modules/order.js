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