<template>
	<view class="app">
		<!-- 顶部导航栏 -->
		<view>
			<uni-nav-bar left-icon="left" title="选择支付方式" @clickLeft="goBack()" />
		</view>
		
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{money}}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥0.0</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view>
		</view>
		
		<text class="mix-btn" @click="confirm">确认支付</text>
		<text class="cancel-btn" @tap="cancelPay">取消支付</text>
	</view>
</template>

<script>
	import {goBack} from '@/common/sharedMethods.js'
	import {
			add,addDetails,updateByNum
	} from "../../network/modules/order.js";
	
	export default {
		data() {
			return {
				payType: 1,
				orderInfo: {},
				orders:[]
			};
		},
		computed: {
		
		},
		onLoad(e) {
			console.log(e.money)
			this.money=e.money
			console.log(e)
			
			//传的是订单编号数组
			this.orders=JSON.parse(e.ids)
			console.log('payment订单编号数组'+this.orders)
			
		},

		methods: {
			goBack(){
				goBack()
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm() {
				if (Array.isArray(this.orders)) {
				   this.orders.forEach(i=>{
				   	// i.state=1
				   	console.log(i)
				   	
				   	//遍历订单编号，改变state为1
				   	updateByNum(i,1)
				   	.then(function(res){
				   		console.log(res)
				   		
				   		uni.redirectTo({
				   			url: '/pages/payment/paySuccess'
				   		})
				   	})
				   })
				   // console.log(this.orders)
				} 
				else {
					// this.orders单个，直接把这个订单编号传过去
					updateByNum(this.orders,1)
						.then(function(res){
							console.log(res)
							uni.redirectTo({
								url: '/pages/payment/paySuccess'
							})
						})
				    console.log("this.orders is not an array");
				}
			},
			cancelPay(){
				uni.switchTab({
					url:"../cart/cart"
				})
			}
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.cancel-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 0 auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: grey;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px ;
	}
</style>
