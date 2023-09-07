<template>
	<view>
		<!-- 顶部导航栏 -->
		<TopBar barTitle="订单详情" @click-left='callGoMy()'></TopBar>
		
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
		
	</view>
</template>

<script>
import TopBar from '../../components/common/topBar.vue'
	
import {goMy} from '@/common/sharedMethods.js'

export default {
	components:{
		TopBar
	},
	data() {
		return {
			selectTitles:[
				{title:"全部"},
				{title:"待支付"},
				{title:"待发货"},
				{title:"已发货"},
				{title:"待评价"},
				{title:"退款项"}
			],
			current:0,
		}
	},
	methods: {
		onClickItem(e){
			if(this.current != e.currentIndex){
				this.current = e.currentIndex;
			}
			this.fetchPetData(this.current)
		},
		
		fetchPetData(current){
			// this.petList =
		},
		callGoMy(){
			goMy();
		},
	},
	mounted() {
		console.log('mounted:index ',this.$route.query.num)
		var selectNum=parseInt(this.$route.query.num)
		this.current=selectNum
		//this.fetchPetData(selectNum); // 初始化时获取默认选项卡的宠物信息数据
		
	}
}
</script>

<style>

</style>
