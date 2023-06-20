export default {
	state: {
		addresslist: [],
	},
	getters: {

	},
	mutations: {
		setAddressList(state,list){
		      state.addresslist=list;
		    },
	}
}