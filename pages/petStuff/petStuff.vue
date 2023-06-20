<template>
	<view>
		<!-- 顶部导航栏 -->
		<TopBar barTitle="宠物周边" @click-left='callGoIndex()'></TopBar>
		
		<StuffCard v-for="(item, index) in stuffList" 
		:key="index" :pet="item" />
		
	</view>
</template>

<script>
	import TopBar from '../../components/common/topBar.vue'
	
	import {goIndex} from '@/common/sharedMethods.js'
	import StuffCard from '@/components/stuffCard/stuffCard.vue'
	import {
		showStuff
	} from "../../network/modules/stuff.js";
	import {goDetail} from '@/common/sharedMethods.js'
	
	
	export default {
		components:{
			TopBar,
			StuffCard
		},
		data() {
			return {
				stuffList:[],
				
			}
		},
		methods: {
			callGoDetail(id,type,shopId){
				goDetail(id,type,shopId)
				console.log(id,type,shopId);
			
				// console.log(id)
			},
			callGoIndex(){
				goIndex();
			},
			fetchPetData(){
				let self=this
				// console.log(typeof(name))
				
				showStuff()
				.then(function(res){
					  // if (res.status === 200) {
						console.log(res.data); 
						self.stuffList=res.data
					  // }
				})
				.catch(function(err){
					console.log(err)
				})
			}
		},
		mounted() {
			this.fetchPetData(); // 初始化时获取默认选项卡的宠物信息数据
			// console.log('初始化')
		},
		
	}
</script>

<style>

</style>
