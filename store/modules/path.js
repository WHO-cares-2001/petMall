export default {
	state: {
		addresslist: [],
		// defaultPath:[]
	},
	getters: {
		getList(state) {
			return state.addresslist;
		},
		// getDefaultPath(state){
		// 	return state.defaultPath;
		// }
	},
	mutations: {
		setAddressList(state,list){
		  state.addresslist=list;
		},
		
	}
}