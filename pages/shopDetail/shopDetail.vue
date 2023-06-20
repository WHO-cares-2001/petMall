<template>
	<view>
		<view>
			<uni-nav-bar left-icon="left" title="商家详情" @clickLeft="goBack()" :border="false" />
		</view>


		<uni-list class="shopInfo">
			<uni-list-item :border="false" rightText="进入地图" showArrow 
				:thumb="shopInfo.img" thumb-size="lg" />
			<uni-list-item :border="false" title="商家名称" :rightText="shopInfo.shopName" />
			<uni-list-item :border="false" title="商家地址" :rightText="shopInfo.address" />
			<uni-list-item :border="false" title="商家详情" :note="shopInfo.introduction" />
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopInfo:{
					shopName:'蓝精灵萌宠专卖',
					address:'江苏省南京市秦淮区',
					introduction:'本犬舍秉承良心养狗，养猫 诚信经营的理念，用心饲养每一只宠物，所有宠物定时驱虫，定期注射疫苗，保证健康，终身售后：终身享受免费咨询让您没有后顾之忧！',
					img:'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				}
			}
		},
		methods: {
			goBack() {
				//uni.navigateBack()//默认delta:1
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
		}
	}
</script>

<style>
	.shopInfo {
		width: 95%;
		margin: auto;
		
	}
</style>