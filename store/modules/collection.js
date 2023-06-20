export default{
		
	state:{
		favorList:[],
		
	},
	mutations: {
		//从后端获取的数据放进来
		addfavorList(state, data) {
		  state.favorList = data;
		  console.log('addfavorList')
		},
		delfavorList(state, id) {
		    const index = state.favorList.findIndex(item => item.id === id);
		    if (index !== -1) {
		      state.favorList.splice(index, 1);
		    }
			
			console.log('addfavorList')
		}
	}
}
