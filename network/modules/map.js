import {postJson,post,get} from "../axios"

export function nearbyShops(address){
    return get('/show/shops', { address: address })
}
