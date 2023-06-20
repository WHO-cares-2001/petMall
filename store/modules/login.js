export default{
		
	state:{
		 //若localSorage存在token，将值赋给Vuex.state.token
		token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
		userId:localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
		
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
	}
}