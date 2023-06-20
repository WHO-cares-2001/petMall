import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//购物车
import cart from './modules/cart.js'
import login from './modules/login.js'
import collection from './modules/collection.js'
import path from './modules/path.js'
import user from './modules/user.js'

// export default new Vuex.Store({
// 	modules:{
// 		cart
// 	},
	
// })

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	modules:{
		cart,
		login,
		collection,
		path,
		user
	},
	state:{//存放状态
		"username":"foo",
		"age":18
	}
})
export default store