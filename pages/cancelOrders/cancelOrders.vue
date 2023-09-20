<template>
	<view>
		<!-- 顶部导航栏 -->
		<TopBar barTitle="取消的订单" @click-left='callGoMy()'></TopBar>
		
		<canceItems :byshopList="items"></canceItems>
	</view>
</template>

<script>
	import TopBar from '../../components/common/topBar.vue'
	import canceItems from '../../components/canceItems.vue'
	import {
			cancel
		} from "../../network/modules/order.js";
	import {goMy} from '@/common/sharedMethods.js'
	
	export default {
		components:{
			canceItems,
			TopBar
		},
		data() {
			return {
				items:[],
				
			};
		},
		methods:{
			callGoMy(){
				goMy();
			},
			get(){
				let self=this
				let id = window.localStorage.getItem("userId")
				
				cancel(id)
				.then(function(res){
					console.log(res)
					self.orderByNumber(res.data,self)
				})
			},
			orderByNumber(data,self){
				const orderMap = new Map();
				  // 遍历原始数组
				  data.forEach(item => {
				    const n = item.number;
				    // 检查是否已经有相同 shopId 的数组，如果没有则创建一个新数组
				    if (!orderMap.has(n)) {
				      orderMap.set(n, []);
				    }
				    // 将商品添加到对应的数组中
				    orderMap.get(n).push(item);
				  });
				  // 将 Map 转换为数组，即按照 shopId 分组的数组
				  const result = [...orderMap.values()];
				  console.log(result)
				  self.items=result
				  console.log(self.items)
				  // 强制更新组件，使新数据生效
					// self.$forceUpdate();
			},
		},
		onShow(){
			this.get()
		}
	}
</script>

<style lang="scss">

</style>
