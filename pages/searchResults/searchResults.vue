<template>
	<view>
		<!-- 顶部导航栏 -->
		<TopBar barTitle="搜索结果" @click-left='callGoIndex()'></TopBar>
		
		<view class="result">
			<!-- 分段器 -->
			<uni-segmented-control
				:current="current"
				:values="selectTitles.map(value => value.title)"
				@clickItem="onClickItem"
				styleType="text"
				activeColor="#FE4355"
				class="control"
			>
			</uni-segmented-control>
			
			<view class="">
				<view v-if="current === 0">
				  <pet-card v-for="(item, index) in resList" :key="index" :pet="item" />
				  
				  <view class="text" v-if="resList.length===0">
				  	<text>无结果，请换个关键词搜索吧~</text>
				  </view>
				</view>
				
				<view v-if="current === 1">
					<view class="text" v-if="resList.length===0">
						<text>无结果，请换个关键词搜索吧~</text>
					</view>
					
				  <StuffCard v-for="(item, index) in resList" :key="index" :pet="item" />
				</view>
				
				<!-- <view v-if="current === 2">
				  <text>3</text>
				</view> -->
			</view>
			
		</view>
	</view>
</template>

<script>
	import TopBar from '../../components/common/topBar.vue'
	
	import {goIndex} from '@/common/sharedMethods.js'
	import PetCard from '@/components/categorySelect/categoryList.vue'
	import StuffCard from '@/components/stuffCard/stuffCard.vue'
	
	import {
			searchStuff,searchAnimal
	} from "../../network/modules/search.js";
	import {goDetail} from '@/common/sharedMethods.js'
	
	export default {
		components:{
			TopBar,
			PetCard,
			StuffCard
		},
		data() {
			return {
				selectTitles:[
					{title:"宠物"},
					{title:"周边"}
					// ,
					// {title:"店铺"},
				],
				current:0,
				resList:[],
				
			};
		},
		methods:{
			callGoIndex(){
				goIndex();
			},
			onClickItem(e){
				if(this.current != e.currentIndex){
					this.current = e.currentIndex;
				}
				this.fetchPetData(this.current)
			},
			fetchPetData(current){
				if(current===0){
					this.animal()
				}else if(current===1){
					this.stuff()
				}
				// else if(current===2){
					
				// }
			},
			stuff(){
				let self=this
				let name=this.$route.query.name
				console.log(name)
				
				searchStuff(name)
				.then(function(res){
						console.log(res)
						console.log(res.data.data); 
						self.resList=res.data
					  
				})
				.catch(function(err){
					console.log(err)
				})
			},
			animal(){
				let self=this
				let name=this.$route.query.name
				console.log(typeof(name))
				
				searchAnimal(name)
				.then(function(res){
					  // if (res.status === 200) {
						// console.log(res.data); 
						self.resList=res.data
					  // }
				})
				.catch(function(err){
					console.log(err)
				})
			},
			
		},
		mounted() {
			this.fetchPetData(0); // 初始化时获取默认选项卡的宠物信息数据
			// console.log('初始化')
		}
	}
</script>

<style lang="scss">
.text{
	padding: 70rpx 140rpx;
}
</style>
