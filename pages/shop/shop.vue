<template>
	<view>
		<view>
			<uni-nav-bar left-icon="left" title="商家详情" @clickLeft="goBack()" :border="false" />
		</view>


		<uni-list class="shopInfo">
			<uni-list-item :border="false" rightText="进入地图" showArrow 
				:thumb="'../../static/petImgs/'+shopInfo.img" thumb-size="lg" />
			<uni-list-item :border="false" title="商家名称" :rightText="shopInfo.shopName" />
			<uni-list-item :border="false" title="商家地址" :rightText="shopInfo.address" />
			<uni-list-item :border="false" title="商家详情" :note="shopInfo.introduction" class="intro"/>
		</uni-list>
		
		<!-- <uni-row>
			<uni-col :span="12" 
			v-for="(item,index) in petList" :key="index" :index="index">
				<uni-card padding="0" spacing="0" margin="15rpx" 
				@tap='callGoDetail(item.id,0,item.shopId)'>
				
					<template v-slot:cover>
						<view class="custom-cover" @tap='callGoDetail(item.id,0,item.shopId)'>
							<image class="pet-img" 
							mode="aspectFit" 
							:src="petPath+item.img">
							</image>
							
						</view>
					</template>
					
					<uni-list>
						<uni-list-item :title="item.typeName">
							<template v-slot:footer>
								<text class="slot-text" >
									￥{{item.price}}
								</text>
								
							</template>
						</uni-list-item>
					</uni-list>
				</uni-card>
			</uni-col>
		</uni-row>
		
		<uni-row>
			<uni-col :span="12" 
			v-for="(item,index) in stuffList" :key="index" :index="index">
				<uni-card padding="0" spacing="0" margin="15rpx" 
				@tap='callGoDetail(item.id,1,item.shopId)'>
				
					<template v-slot:cover>
						<view class="custom-cover" @tap='callGoDetail(item.id,1,item.shopId)'>
							<image class="pet-img" 
							mode="aspectFill" 
							:src="petPath+item.imgs">
							</image>
							
						</view>
					</template>
					
					<uni-list>
						<uni-list-item :title="item.stuffName">
							<template v-slot:footer>
								<text class="slot-text" >
									￥{{item.price}}
								</text>
								
							</template>
						</uni-list-item>
					</uni-list>
				</uni-card>
			</uni-col>
		</uni-row> -->
		
		<indexCard :items="petList" :type="0"></indexCard>
		<indexCard :items="stuffList" :type="1"></indexCard>
	</view>
</template>

<script>
	import {
		shop,getstuff,getanimal
	} from "../../network/modules/shop.js";
	import {goDetail} from '@/common/sharedMethods.js'
	import indexCard from '../../components/indexCard.vue'
	
	export default {
		components:{
			indexCard
		},
		data() {
			return {
				shopInfo:{
					shopName:'蓝精灵萌宠专卖',
					address:'江苏省南京市秦淮区',
					introduction:'本犬舍秉承良心养狗，养猫 诚信经营的理念，用心饲养每一只宠物，所有宠物定时驱虫，定期注射疫苗，保证健康，终身售后：终身享受免费咨询让您没有后顾之忧！',
					img:'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				},
				petList:[],
				stuffList:[],
				petPath:"../../static/petImgs/",
			}
		},
		methods: {
			callGoDetail(id,type,shopId){
				goDetail(id,type,shopId)
				console.log(id,type,shopId)
			},
			goBack() {
				//uni.navigateBack()//默认delta:1
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			getAllGoods(id){
				let self = this;
				
				getanimal(id)
				.then(function(res) {
					self.petList = res.data
					console.log(res.data)
				})
				
				getstuff(id)
				.then(function(res) {
					self.stuffList = res.data
					console.log(res.data)
				})
			},
			
		},
		onLoad() {
			let self = this;
			
			this.shopId=this.$route.query.shopId
			
			console.log()
			shop(this.shopId)
			.then(function(res) {
				self.shopInfo = res.data;
				console.log(res.data)
			})
			
			
			this.getAllGoods(this.shopId)
			
		},
	}
</script>

<style>
	.shopInfo {
		width: 95%;
		margin: auto;
		
	}
	.pet-img{
		margin: 0 20rpx;
		width: 310rpx;
		height: 340rpx;
	/* 	width: 100%;
		height: 100%;
		opacity: 1; */
	}
	.slot-text{
		color: red;
	}
	.intro{
		margin-bottom: 30rpx;
	}
</style>