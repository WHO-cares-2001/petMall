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
			
			console.log('delfavorList')
		},
		addone(state, data){
			 state.favorList.push(data)
			console.log('addone')
			console.log(state.favorList)
		}
	},
	getters:{
		//判断是否已收藏，true表示已收藏
		isFavorite: (state) => (type, goodsId) => {
		    if (type === '0') {
		      // 根据type值为0查找favorList中animalId和参数goodsId相等的
		      return state.favorList.some(item => item.animalId === goodsId);
		    } else if (type === '1') {
		      // 根据type值为1查找favorList中stuffId和参数goodsId相等的
		      return state.favorList.some(item => item.stuffId === goodsId);
		    }
		    return false; // 默认返回false，处理其他情况
		  },
	}
}
