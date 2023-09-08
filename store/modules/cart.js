import {
		getCart
	} from "../../network/modules/cart.js";
	

export default{
	state:{
		a:"456",
		
		// 购物车信息存储在这里
		list:[
			{
				checked:false,
				id:1,
				name:"啊拒绝偶爱你分配就怕看佛经破",
				option:"规格",
				imgUrl:"../../static/petImgs/img/16.jpg",
				price:"2000.0",
				num:1
			},
			{
				checked:false,
				id:2,
				name:"啊拒绝偶爱你分配就怕看佛经破",
				option:"规格",
				imgUrl:"../../static/petImgs/img/16.jpg",
				price:"2000.0",
				num:1
			}
		],
		selectedList:[],
		orderListByShopId:[]
	},
	getters:{
		//判断是否全选
		checkedAll(state){
			return state.selectedList.length===state.list.length;
		},
		//合计
		totalCount(state){
			let total={
				pprice:0,
				num:0
			}
			
			state.list.forEach(v=>{
				//是否选择
				if(state.selectedList.indexOf(v.id)>-1){
					//合计
					total.pprice+=v.pprice*v.number
					//结算数量
					total.num=state.selectedList.length;
				}
			})
			total.pprice=total.pprice.toFixed(2)
			return total;
		},
		
	},
	mutations:{
		//全选
		checkAll(state){
			state.selectedList=state.list.map(v=>{
				v.checked=true
				return v.id
			})
		},
		//全不选
		checkNone(state){
			state.list.forEach(v=>{
				v.checked=false
			})
			state.selectedList=[]
		},
		//单选
		selectedItem(state,index){
			let id=state.list[index].id
			// console.log(id)
			let i=state.selectedList.indexOf(id)
			//如果selectedList中已经存在表示之前是选中状态
			//那么此时就要从selectedList中删除
			if(i>-1){
				state.list[index].checked=false
				return state.selectedList.splice(i,1)
			}
			//如果之前没有选中
			state.list[index].checked=true
			state.selectedList.push(id)
		},
		
		//加入购物车
		addToCart(state, item) {
		  state.list.push(item);
		  // 调用后端接口将购物车数据保存到数据库
		  
		},
		removeFromCart(state, itemId) {
		  state.list = state.list.filter(item => item.id !== itemId);
		  
		},
		//从后端获取的所有数据放进来
		updateList(state, data) {
		  state.list = data;
		  console.log(data)
		  console.log('updateList')
		},
		//删一个购物车
		delList(state, id) {
		    const index = state.list.findIndex(item => item.id === id);
		    if (index !== -1) {
		      state.list.splice(index, 1);
		    }
			
			console.log('delList')
		},
		addUpdate(state,id){
			const item = state.list.find(item => item.id === id);
			if (item) {
			  item.number += 1;
			}
		},
		delUpdate(state,id){
			const item = state.list.find(item => item.id === id);
			if (item) {
			  item.number -= 1;
			}
		},
		
	},
	actions:{
		//全选
		selectAll({commit,getters}){
			//true代表全不选，false代表要全选
			getters.checkedAll?commit("checkNone"):commit("checkAll")
		}
		
	}
}