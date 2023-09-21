import {
	postJson,
	post,
	get
} from "../axios"

export function add(Orders){
    return postJson('/orders/saves',Orders )
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

//取消理由以及其他的所有理由
export function cancelR(reason){
    return postJson('/reason/saves', reason)
}

//通过订单编号更改订单状态
export function updateByNum(number,state){
    return get('/show/updatabynumber', {number:number,state:state})
}

//展示该用户取消的所有订单
export function cancel(id){
    return get('/show/bycancle', {id:id})
}

//提交订单以后删掉相应购物车内容
export function deleteCarts(ids){
    return post('/cart/deletes', { ids: ids })
}

//是否折扣在有效期
export function isDiscountValid(id){
    return get('/discounts/time', {id:id})
}

//展示该用户退货状态-2 -3 -4的所有订单
export function returnOrders(id){
    return get('/show/byreturn', {id:id})
}