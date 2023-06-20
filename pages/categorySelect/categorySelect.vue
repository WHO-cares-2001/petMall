<template>
	<view class="">
		
		<!-- 顶部导航栏 -->
		<TopBar barTitle="全部品种" @click-left='callGoIndex()'></TopBar>
		
		<view>
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
			
			<!-- 具体内容 -->
			<view class="content">
				<!-- <view v-if="current === 0">
					<text>1</text>
				</view>
				<view v-if="current === 1">
					<text>2</text>
				</view>
				<view v-if="current === 2">
					<text>3</text>
				</view> -->
				
				<pet-card v-for="(item, index) in petList" :key="index" :pet="item" />
			</view>
		</view>
		
		
	</view>
	
</template>

<script>
import TopBar from '../../components/common/topBar.vue'
import PetCard from '@/components/categorySelect/categoryList.vue'

import {goIndex} from '@/common/sharedMethods.js'
import {
		getAnimalbytype
	} from "../../network/modules/select.js";
import {goDetail} from '@/common/sharedMethods.js'

	
export default {
	components:{
		TopBar,
		PetCard
	},
	data() {
		return {
			selectTitles:[
				{title:"猫猫"},
				{title:"狗狗"},
				{title:"异宠"},
			],
			current:0,
			petList:[],
			titles:["猫","狗","异宠"],
		}
	},
	methods: {
		onClickItem(e){
			if(this.current != e.currentIndex){
				this.current = e.currentIndex;
			}
			this.fetchPetData(this.current)
		},
		callGoIndex(){
			console.log('触发')
			goIndex();
		},
		fetchPetData(current){
			// this.petList =
			let self=this
			let name=this.titles[this.current]
			// console.log(typeof(name))
			
			getAnimalbytype(name)
			.then(function(res){
				  
					self.petList=res.data
				  
			})
			.catch(function(err){
				console.log(err)
			})
		}
	},
	mounted() {
		console.log('mounted:index ',this.$route.query.num)
		var selectNum=parseInt(this.$route.query.num)-1
		this.current=selectNum
		this.fetchPetData(selectNum); // 初始化时获取默认选项卡的宠物信息数据
		
	}
}
</script>

<style>
/* .control{
	position: sticky;
	top: 80rpx;
} */
</style>
