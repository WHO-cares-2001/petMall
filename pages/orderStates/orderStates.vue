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
		
		<orderItems :byshopList="items" :text="texts"></orderItems>
		
		<!-- <view class="" v-if="current===0">
			
		</view> -->
	</view>
</template>

<script>
import TopBar from '../../components/common/topBar.vue'
import orderItems from '../../components/orderItems.vue'
import {
		getByStates,getAll
	} from "../../network/modules/order.js";
	
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
				{title:"已完成"}
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
					}
				]
			],
			ftext:"退单",
			items:[],
			texts:[
				"去支付",
				"待发货",
				"签收",
				"去评价",
				"已完成"
			]
		}
	},
	methods: {
		onClickItem(e){
			let self=this
			if(this.current != e.currentIndex){
				this.current = e.currentIndex;
			}
			
			let id = window.localStorage.getItem("userId");
			if(this.current===0){
				getAll(id)
				.then(function(res){
					console.log(res)
					self.orderByNumber(res.data)
				})
			}else if(this.current>0){
				this.fetchPetData(this.current)
			}
		},
		orderByNumber(data){
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
			  this.items=result
			  console.log(this.items)
			  // 强制更新组件，使新数据生效
				// self.$forceUpdate();
		},
		fetchPetData(current){
			let self=this
			let id = window.localStorage.getItem("userId");
			//&&this.current<5
			if(current>0){
				//查state
				console.log(current-1)
				getByStates(id,current-1)
				.then(function(res){
					console.log(res)
					self.orderByNumber(res.data)
				})
				self.ftext=self.texts[current-1]
			}
			// else if(current===5){
			// 	this.items=[]
			// }
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

<style scoped>
.control{
	background-color: white;
}
</style>
