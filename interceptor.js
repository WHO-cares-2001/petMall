// //页面白名单
// const whiteList = [
// 	"/pages/index/index",
// 	"/pages/public/login",
// 	"/pages/categorySelect/categorySelect"
// ]
// const token=localStorage.getItem('token')
// const loginPage = "/pages/public/login"; // 设置登录页面路径

// function isValidToken(token) {
//   // 如果 token 不为空（即存在且有值），返回 true；否则返回 false
//   console.log(token)
//   return !!token;
// }

// function hasPermission(url){
	
// 	if(token&&isValidToken(token)){
// 		console.log(token)
// 		return true
// 	}
// 	//请求路径在白名单中直接跳转，或者带有token直接跳转，
// 	for (var i = 0; i < whiteList.length; i++) {
// 		/* || 或者带有token直接跳转 */
// 		if(url.indexOf(whiteList[i]) != -1 ){
// 			return true
// 		}
// 	}
// 	console.log('失败')
// 	return false 
// }

// uni.addInterceptor('navigateTo',{
// 	invoke(e) {
// 		console.log(e)
// 		//||!isValidToken(token
// 		if(!hasPermission(e.url)){
// 			 // 判断是否已经在登录页面，避免无限递归
// 			if (e.url !== loginPage) {
// 				console.log('跳转login页面')
// 				uni.navigateTo({
// 					url:"../public/login"
// 				})
// 			}
// 			return false
// 		}
// 		return true
// 	},
// 	success(e) {
// 		console.log(e)
// 	},fail(e){
// 		console.log(e)
// 	}
// })
// /*
// uni.addInterceptor('switchTab', {
//     // tabbar页面跳转前进行拦截
//     invoke (e) {
//         if(!hasPermission(e.url)){
//             uni.reLaunch({
//                 url: '/pages/login/login'
//             })
// 			console.log('不在白名单内')
//             return false
//         }
// 		console.log('在白名单内')
//         return true
//     },
//     success (e) {
		
//     }
// })
// */