import App from './App'

//未登录拦截器
import interceptor from 'interceptor.js'


//vuex
import store from './store'
Vue.prototype.$store=store;

//axios
import axios from 'axios'
Vue.prototype.$axios = axios;

//router
import router from './router'

// #ifdef H5
// import {RouterMount} from 'uni-simple-router'
// RouterMount(Vue, router, '#app')
// #endif



// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store//可有可无
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

// import uView from "@/uview-ui";
// Vue.use(uView);

// 定义无需登录即可访问的路径列表
const publicRoutes = ['/', '/pages/login/login', 
'/pages/register/register','/pages/index/index',
'/pages/searchResults/searchResults']

//路由全局前置守卫,这种对uniapp不适用
// router.beforeEach((to,from,next) => {


// import Json from './Json'

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.prototype.$api = {msg, json, prePage};