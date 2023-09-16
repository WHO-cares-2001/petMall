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

// export function updateDetails(OrderDetails){
//     return postJson('/orderdetails/update', OrderDetails)
// }

export function getByStates(id,state){
    return get('/show/byidstateorders', {id:id,state: state })
}
export function getById(id){
    return get('/show/byordersid', {id:ids})
}

export function getAll(id){
    return get('/show/byidorders',{id:id})
}

//取消理由
export function cancelR(reason){
    return postJson('/reason/saves', reason)
}

//通过订单编号更改订单状态
export function updateByNum(number,state){
    return get('/show/updatabynumber', {number:number,state:state})
}