export default{
		
	state:{
		 //若localSorage存在token，将值赋给Vuex.state.token
		token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
		userId:localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
		
		//2
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		setUserId(state, userId) {
		  state.userId = userId
		  localStorage.setItem('userId', userId)
		  // console.log('veux')
		  console.log('userId',userId)
		},
		setToken(state, token) {
			localStorage.setItem('token', token)
			state.token = token
			console.log('veux')
			console.log('token',token)
		},
		//2
		setUserInfo(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: provider
			});
			
			localStorage.setItem('token', provider.token);
			localStorage.setItem('userId', provider.user.id)
		},
		cleanUserInfo(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			});
			
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
		}
	},
	//2
	getters:{
		getHasLogin(state){
			return state.hasLogin
		},
		getUserInfo(state){
			return state.userInfo
		}
	},
}