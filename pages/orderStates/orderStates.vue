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
		
		<orderItems :byshopList="test"></orderItems>
	</view>
</template>

<script>
import TopBar from '../../components/common/topBar.vue'
import orderItems from '../../components/orderItems.vue'

import {goMy} from '@/common/sharedMethods.js'

export default {
	components:{
		TopBar,
		orderItems
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
			test:[
				[
					{
						"id": "1701028824264740865",
						"etc": null,
						"userId": "8",
						"animalId": "1",
						"stuffId": null,
						"number": 1,
						"goodsType": 0,
						"name": "可爱的金毛",
						"img": "img/22.jpg",
						"pprice": 2000,
						"shopId": "1",
						"shopName": "蓝精灵萌宠专卖",
						"checked": true
					}
				],
				[
					{
						"id": "1701028838672175106",
						"etc": null,
						"userId": "8",
						"animalId": "12",
						"stuffId": null,
						"number": 1,
						"goodsType": 0,
						"name": "完美海双布偶弟弟",
						"img": "img/33.jpg",
						"pprice": 4888,
						"shopId": "6",
						"shopName": "Healer布偶猫舍",
						"checked": true
					},
					{
						"id": "1701029039373815810",
						"etc": null,
						"userId": "8",
						"animalId": "11",
						"stuffId": null,
						"number": 1,
						"goodsType": 0,
						"name": "海双布偶妹妹",
						"img": "img/32.jpg",
						"pprice": 2188,
						"shopId": "6",
						"shopName": "Healer布偶猫舍",
						"checked": true
					}
				]
			],
			
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
			
		},
		callGoMy(){
			goMy();
		},
	},
	mounted() {
		console.log('mounted:index ',this.$route.query.state)
		var selectNum=parseInt(this.$route.query.state)
		this.current=selectNum+1
		this.fetchPetData(this.current); // 初始化时获取默认选项卡的宠物信息数据
		
	}
}
</script>

<style>

</style>
