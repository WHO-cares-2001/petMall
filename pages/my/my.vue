<template>
	<view class="my">
		<!-- 顶部导航栏 -->
		<view class="box-bg">
			<NoReturnBar barTitle="我的"></NoReturnBar>
		</view>
		
		<!-- 头像和背景 -->
		<view class="bg" @tap="goMyInfo">
			<view class="my-header">
				<image class="logo-img" 
				 :src="userData.img">
				</image>
				<view class="logo-name">
					{{userData.username}}
				</view>
			</view>
		</view>
		
		<!-- 几个图标栏 -->
		<view class="order" >
			<view class="order-title" @tap="callGoOrderStates">
				<view>
					我的订单
				</view>
				<view class="">
					全部订单 >
				</view>
			</view>
			
			<view class="order-list">
				<uni-grid :column="5" class="grid-items"
				:highlight="false" :showBorder="false"
				@change="change">
					<uni-grid-item v-for="(item, index) in details" 
					:index="index" :key="index">
					
						<view class="grid-item-box" style="background-color: #fff;">
							<image class="every"
							:src="imgPath+orderImgs[index]" mode="aspectFill"></image>
							<text class="grid-text">{{item}}</text>
						</view>
						
					</uni-grid-item>
				</uni-grid>
			</view>
			
			<!-- 内容列表 -->
			<view class="">
				<uni-list>
					<uni-list-item title="我的收藏"  showArrow
						:thumb="imgPath+'love.png'"
						thumb-size="base"  
						@click='goCollection' link
					/>
					
					<uni-list-item title="收货地址"  showArrow
						:thumb="imgPath+'address.png'"
						thumb-size="base"  
						@click='goAddress' link
					/>
				</uni-list>		

			</view>
		</view>
	</view>
</template>

<script>
	import NoReturnBar from '../../components/common/NoReturnBar.vue'
	
	import {goOrderStates} from '@/common/sharedMethods.js'
	import {
		userInfornation,
		update
	} from "../../network/modules/user.js";
	
	export default {
		components:{
			NoReturnBar
		},
		data() {
			return {
				details:[
					"待支付",
					"待发货",
					"已发货",
					"待评价",
					"退款项"
				],
				imgPath:"../../static/icon/",
				orderImgs:[
					"order1.png",
					"order2.png",
					"order3.png",
					"order4.png",
					"order5.png",
				],
				userData: {
					id: '',
					username: '',
					nikename: '',
					img: '',
					sex: '',
					tel: '',
				},
			};
		},
		onLoad() {
			let self = this;
			
			let id = window.localStorage.getItem("userId");
			userInfornation({
				id: id
			}).then(function(res) {
				self.userData = res.data;
				self.userData.img='../../static/petImgs/'+self.userData.img;
				console.log(self.userData);
			})
		},
		methods:{
			goCollection(){
				uni.navigateTo({
					url:'../collection/collection'
				})
				console.log('goCollection')
			},
			callGoOrderStates(){
				goOrderStates(0);
			},
			goAddress(){
				
				// console.log('goMy')
				uni.navigateTo({
					url: '../myAD/myAD' // 替换为目标页面的路径
				});
				 
			},
			goMyInfo(){
				uni.navigateTo({
					url: '../myInfo/myInfo' // 替换为目标页面的路径
				});
				 
			},
			change(e) {
				let {
					index
				} = e.detail
				
				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
				goOrderStates(index+1);
			},
			
		}
	}
</script>

<style scoped>
.box-bg {
		background-color: #F5F5F5;
		padding: 5px 0;
	}


/* 相当于header-main */
.bg{
	background: url(../../static/bg.jpg) no-repeat;
	width: 100%;
	height: 300rpx;
	position: relative;
}

.logo-img{
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	/* background-color: white; */
}
.logo-name{
	color: white;
	font-weight: bold;
	margin:10rpx 0 ;
	padding-left:30rpx ;
	font-size: 40rpx;
}

.my-header{
	position: absolute;
	left: 50%;
	margin-left: -80rpx;
	top: 20%;
}

.order-title{
	display: flex;
	justify-content: space-between;
	align-items: auto;
	padding: 20rpx;
}
.every{
	width: 50rpx;
	height: 50rpx;
	display: block;
	padding: 20rpx 0 15rpx 50rpx;
}

.grid-text{
	/* text-align: center; */
	padding-left: 30rpx;
}


</style>
