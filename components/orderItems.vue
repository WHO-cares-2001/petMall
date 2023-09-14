<template>
	<view class="top">
		
		<!-- 商品内容 -->
		<view class="shop-list">
			<view class="shop-item" v-for="(i,index) in byshopList" :key="index">
				<view class="g-header">
					<uni-icons type="shop" size="27" color="#FE4355"></uni-icons>
					<text class="name">{{i[0].shopName}}</text>
				</view>
				
				<view class="shops-goods" v-for="(item,secondIndex) in i" :key="item.id">
					<!-- 倒计时 -->
					<view class="countdown" v-if="timeupSecond!==null&&item.state === '0'">
						<!-- <view>时间{{ timeupSecond }}</view> -->
						<uni-countdown v-if="item.state === '0'&&secondIndex===0" 
						class="room-count" color="#fff" 
						:show-day="false" :second="timeupSecond"
						 background-color="#FE4355"
						@timeup="timeup(i[0].createTime)" />
						<text v-if="item.state === '0'&&secondIndex===0" class="count-txt">之后订单取消</text>
					</view>
					<view class="invalid" v-if="timeupSecond===null&&secondIndex===0&&item.state === '0'">
						<text class="invalid-text">交易关闭</text>
					</view>
					
					<view class="g-body">
						<!-- 多选框 -->
						<!-- <label class="radio" @tap="selectedItem(item.id)">
							<radio value="" color="#FF3333" :checked="item.checked"/>
							<text></text>
						</label> -->
						
						<image :src="petPath+item.img" mode="" 
						class="shop-img"@tap="callGoDetail(item)">
						</image>
						
						<view class="shop-text">
							<view class="" >
								<view class="shop-name" @tap="callGoDetail(item)">
									<view @tap="callGoDetail(item)">{{item.name}}</view>
									<!-- <uni-icons type="trash-filled" size="25"
									color="grey" @tap="del(item.id)"
									class="trash">
									</uni-icons> -->
								</view>
								<view class="shop-option">
									<!-- {{item.option}} -->
								</view>
							</view>
							
							<view class="shop-price">
								<view class="price-color" @tap="callGoDetail(item)">
									￥{{item.money}}
								</view>
								<view class="">
									x{{item.num}}
								</view>
							</view>
						</view>
					</view>
				</view>
					
				<!-- 底部按钮  v-if="text[i[0].state]!==''"-->
				<view class="btns" >
					<button @click="go(text[i[0].state],i)"
						type="primary" plain="true" size="mini" 
						style="color:#FE4355;border-color: #FE4355;
						border-radius: 30rpx;height: 60rpx;">
						{{text[i[0].state]}}
							<!-- {{text}} -->
					</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {goMy} from '@/common/sharedMethods.js'
	
	export default {
		props: {
			byshopList: {
			  type: Array,
			  required: true
			},
			text:{
				type:Array,
				required:true
			},
			// texts:{
			// 	type:Array,
			// 	required:true
			// }
		},
		name:"orderItems",
		data() {
			return {
				petPath:"../../static/petImgs/",
				//被绑定的时间值
				timeupSecond:null,

			};
		},
		methods:{
			goMy(){
				goMy()
			},
			callGoDetail(item){
				
			},
			// 倒计时
			timeup(createTime) {
					var that = this;
					/**setInterval间歇调用 */
					that.timer = setInterval(function () {
					//订单下单时间
					var buy_time = createTime;
					//计算剩余时间
					var time = (new Date(buy_time).getTime() + 10* 60 * 1000) - (new Date().getTime());
					if(time>0){
					  //计算剩余的分钟
					  var minutes = parseInt(time / 1000 / 60 % 60, 10);
					  //计算剩余的秒数
					  var seconds = parseInt(time / 1000 % 60, 10);
					  that.timeupSecond=parseInt(time / 1000);
					  // console.log(that.timeupSecond)
					  //判断分钟和秒数小于10要在前面加个0.
					  if(minutes<10){
						minutes = '0' + minutes;
					  }
					  if (seconds < 10) {
						seconds = '0' + seconds;
					  }
					  var timer = minutes + ":" + seconds;
					}
				}, 1000);
				if(that.timeupSecond==0) {
					uni.showToast({
						title: '时间到'
					})
					this.getOrderPage()
				}
			},
			go(t,i){
				console.log('go')
				let goodsList=i
				console.log(goodsList)
				if(t==="去支付"){
					console.log(i[0].money)
					uni.navigateTo({
						// url:`../payment/payment?goodsList=${JSON.stringify(goodsList)}`
						url: '../payment/payment?money='+i[0].money
							+'&goodsList='+JSON.stringify(goodsList)
					});
				}else if(t==="待发货"){
					
				}else if(t==="签收"){
					
				}else if(t==="去评价"){
					
				}
			}
		}
	}
</script>

<style scoped>
	/* .top{
		background-color: white;
	} */
	page{
		background-color: #f5f5f5;
	}
.shop-list{
	//这样可以看到最底下的那个商品卡片
	padding-bottom: 120rpx;
}
.shop-else-list{
	background-color: #F7F7F7;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 0;
	top: 100rpx;
	/* right: 0;
	bottom: 0; */
}

.shop-item{
	/* display: flex; */
	/* align-items: center; */
	padding: 20rpx;
	margin: 20rpx 10rpx;
	background-color: #fff;
	border-radius: 20rpx;
}
.shops-goods{
	margin-bottom: 20rpx;
}
.countdown{
	display: flex;
	margin-left:20rpx;
	margin-bottom: 15rpx;
}
.invalid{
	background-color: #FE4355;
	color: #fff;
	width: 25%;
	border-radius: 30rpx;
	margin-left: 15rpx;
	display: flex; 
	justify-content: center;
}
.invalid-text{
	padding: 10rpx;
	font-size: 30upx;
}
.count-txt{
	margin: 0 15rpx;
}
.g-body{
	display: flex;
	align-items: center;
	
}
.name {
	font-size: 30upx;
	margin-left: 24upx;
	/* line-height: 40upx; */
	align-items: center;
}
.g-header {
	display: flex;
	align-items: center;
	height: 84upx;
	padding: 0 10upx;
	position: relative;
}
		
.shop-img{
	width: 200rpx;
	height: 200rpx;
	border-radius: 20rpx;
	margin: 10rpx 20rpx;
}

.shop-name{
	display:flex;
	justify-content: space-between;
}

.shop-price{
	display:flex;
	justify-content: space-between;
}
.price-color{
	color:#FE4355 ;
}
.shop-option{
	font-size: 27rpx;
	color: #636263;
	padding:12rpx ;
	margin-top:10rpx;
	margin-bottom: 25rpx;
}

.shop-text{
	flex:1;
	padding-left: 20rpx;
}

.shop-foot{
	position: fixed;
	//不能是0,不然就没了
	bottom: 130rpx;
	left: 0;
	width: 94%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #FFFFFF;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	position: fixed;
	left: 20rpx;
	border-radius: 20rpx;
}
.foot-total{
	display: flex;
	
}
.foot-count{
	padding: 0 20rpx;
	line-height: 100rpx;
}
.foot-num{
	/* background-color: #49BDFB; */
	background-color: #49BDFB;
	color: #FFFFFF;
	padding: 0 40rpx;
	line-height: 80rpx;
	border-radius: 100rpx;
	height: 80rpx;
	margin-top: 13rpx;
	margin-right: 10rpx;
}
.radio{
	padding:0 10rpx;
}
radio{
	transform: scale(0.9)
}

.total-price{
	color: #FE4355;
	font-weight: bold
}
.outside{
	padding:  0 10rpx;
}
.rtext{
	margin-left: 30rpx;
}
.btns{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-left:500rpx ;
}
</style>