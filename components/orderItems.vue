<template>
	<view class="top">
		
		<!-- 商品内容 -->
		<view class="shop-list">
			<view class="shop-item" v-for="(i,index) in byshopList" :key="index">
				<view class="g-header">
					<uni-icons type="shop" size="27" color="#FE4355"></uni-icons>
					<text class="name">{{i[0].shopName}}</text>
				</view>
				
				<view class="shops-goods" v-for="(item,secondIndex) in i" 
				:key="secondIndex" @tap="goOrderDetail(i)">
					<!-- 倒计时 -->
					<!-- <view>时间{{ timeupSecond!==0}} state:{{item.state}} 
					secondIndex:{{secondIndex}}</view> -->
					<view class="countdown" v-if="timeupSecond!==0&&item.state === '0'&&rest(i[0].createTime,i)">
						<uni-countdown v-if="item.state === '0'&&secondIndex===0" 
						class="room-count" color="#fff" 
						:show-day="false" :second="timeupSecond"
						 background-color="#FE4355"
						@timeup="timeup(i[0].createTime)" />
						<text v-if="item.state === '0'&&secondIndex===0" class="count-txt">之后订单取消</text>
					</view>
					<view class="invalid" v-if="!rest(i[0].createTime,i)&&secondIndex===0&&item.state === '0'">
						<text class="invalid-text">交易关闭</text>
					</view>
					
					<view class="g-body">
						<image :src="petPath+item.img" mode="" 
						class="shop-img"@tap="callGoDetail(item)">
						</image>
						
						<view class="shop-text">
							<view class="" >
								<view class="shop-name" @tap="callGoDetail(item)">
									<view @tap="callGoDetail(item)">{{item.name}}</view>
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
					
					<view class="" v-show="i[0].state!=0||rest(i[0].createTime,i)">
						<button @click="goFirst(leftBtn[i[0].state],i)"
							type="primary" plain="true" size="mini" 
							class="btns-1"
							style="color:#FE4355;border-color: #FE4355;
							border-radius: 30rpx;height: 60rpx;">
							{{leftBtn[i[0].state]}}
						</button>
					</view>
					<!-- <view class="" >
						<button @click="goFirst(text[i[0].state],i)"
							type="primary" plain="true" size="mini" 
							class="btns-1"
							style="color:#FE4355;border-color: #FE4355;
							border-radius: 30rpx;height: 60rpx;">
							{{leftBtn[i[0].state]}}
						</button>
					</view> -->
					
					<button @click="go(text[i[0].state],i)"
					class="btns-2"
						type="primary" plain="true" size="mini" 
						style="color:#FE4355;border-color: #FE4355;
						border-radius: 30rpx;height: 60rpx;">
						{{text[i[0].state]}}
					</button>
					
					<!-- 弹出申请退单 -->
					<uni-popup ref="popDialog" type="dialog">
						<uni-popup-dialog mode="input" message="成功消息" 
							:duration="2000" :before-close="false" 
							placeholder="请输入退单理由"
							 @confirm="confirm($event,i)" title="录入退单理由"
							 >
						</uni-popup-dialog>
					</uni-popup>

				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {goMy} from '@/common/sharedMethods.js'
	import{
		cancelR,updateByNum
	}from '@/network/modules/order.js'
	
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
		},
		name:"orderItems",
		data() {
			return {
				petPath:"../../static/petImgs/",
				//被绑定的时间值
				timeupSecond:null,
				//左边按钮文字
				leftBtn:[
					"取消订单",
					"取消订单",
					"申请退单",
					"申请退单",
					"查看评价"
				],
				Dialog: [] ,// 用于存储每个商品项的对话框状态和理由
				showDialogFlag:false,
				reason:'',
				
			};
		},
		created() {
			// 确保byshopList有值
			if (this.byshopList.length > 0) {
				  // 在页面加载时根据byshopList的长度创建对应长度的Dialog数组
				 //  this.Dialog = this.byshopList.map(() => ({
					// showDialogFlag: false,
					// reason: ''
				 //  }));
				  // console.log('Dialog数组已创建：', this.Dialog);
			  } else {
				// console.log('byshopList为空，无法创建Dialog数组');
			  }
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
					clearInterval(that.timer); // 清除计时器
					// 在这里可以触发交易关闭的操作
					//后端写取消理由
					
				}
			},
			rest(time,i){
				// console.log('rest')
				// 当前时间
				var currentTime = new Date();
				// 假设 createTime 是字符串形式，需要将其解析为日期对象
				// console.log(time)
				var createTime = new Date(time);
				// 添加10分钟的时间
				createTime.setMinutes(createTime.getMinutes() + 10);
				// 比较当前时间是否大于 createTime + 10分钟
				if (currentTime > createTime) {
				  console.log("已经超时");
				  //去订单表里写取消说明
				  this.cancelReason(time,i[0].state,i[0].number)
				  return false
				} else {
				  // console.log("还未超时");
				  return true
				}
			},
			cancelReason(time,astate,num){
				//待支付状态和已超时 去写取消说明（超时）
				//!rest(time,i)&&
				if(astate==0){
					let data={
						cancelReason:"超时取消",
						laststate:astate,
						orderitemNumber:num
					}
					console.log(data)
					cancelR(data)
					.then(function(res){
						console.log(res)
					})
				}
			},
			go(t,i){
				// console.log('go')
				let goodsList=i
				console.log(goodsList)
				//这是一个数组，包含一个订单里的所有商品
				let json=JSON.stringify(i)
				
				if(t==="去支付"){
					if(this.rest(i[0].createTime,i)){
						console.log(i[0].money)
						uni.navigateTo({
							// url:`../payment/payment?goodsList=${JSON.stringify(goodsList)}`
							url: '../payment/payment?money='+i[0].money
								+'&goodsList='+JSON.stringify(goodsList)
						});
					}
					else{
						uni.showToast({
							title: `交易已失效，请重新购买！`,
							icon: 'error'
						})
					}
				}else if(t==="待发货"){
					
				}else if(t==="签收"){
					this.signfor(i)
				}else if(t==="去评价"){
					this.goComment(json)
				}
			},
			signfor(json){
				console.log('签收：'+json)
				if (Array.isArray(json)) {
				  //遍历订单编号，改变state为1
				  json.forEach((item) => {
				  	console.log('订单编号：'+item.number)
				  	updateByNum(item.number, 3)
				  	.then(function(res){
				  		console.log(res)
				  	})
				  });
				} else {
				  // 处理 json 不是数组的情况
				  console.log('订单编号：'+json.number)
				  updateByNum(json.number, 3)
				  .then(function(res){
				  	console.log(res)
				  })
				}
			},
			goComment(json){
				//判断是不是已评价 
				//不用判断，自己到下一个状态界面
				// uni.showToast({
				// 	title: `已评价，不能重新评价！`,
				// 	icon: 'error'
				// })
				console.log(json)
				uni.navigateTo({
					url: '../comment/comment?json='+json
				});
			},
			goFirst(text,i){
				let self=this
				console.log(i)
				if(text=="取消订单"){
					//用户取消的
					let data={
						cancelReason:"用户取消",
						laststate:i[0].state,
						orderitemNumber:i[0].number
					}
					console.log(data)
					//这个不是专门写取消理由的，
					//而是专门写所有理由的
					cancelR(data)
					.then(function(res){
						console.log(res)
						// self.timeupSecond=0
						//订单不显示倒计时
					})
				}
				else if(text=="申请退单"){
					this.showDialogFlag=true
					this.submit(i)
				}
			},
			goOrderDetail(i){
				//订单详情
				let it=JSON.stringify(i)
				uni.navigateTo({
					url: '../orderDetail/orderDetail?Info='+it
				});
			},
			submit(i) {
			 //  const item =i
			 //  if (this.reason.length > 0) {
				// // 执行提交操作
				// // 可以在这里添加你的提交逻辑
				// console.log('提交退单：',this.reason);
				// // 提交完成后关闭对话框
				// this.showDialogFlag = false;
				// // 清空理由输入框
				// this.reason = '';
			 //  }
				this.open()
			},
			open() {
				console.log('open')
				this.$refs.popDialog[0].open()
			},
			confirm(value,i) {
				// 输入框的值
				const inputValue = value;
				console.log(inputValue)
				console.log('要退单的商品')
				console.log(i)
				if(value.length===0){
					uni.showToast({
						title:'理由不能为空！',
						icon:'error'
					})
				}else{
					//先提交理由，再更改订单状态
					let data={
						returnReason:value,
						laststate:i[0].state,
						orderitemNumber:i[0].number
					}
					console.log('退单理由'+data)
					//这个不是专门写取消理由的，
					//而是专门写所有理由的
					cancelR(data)
					.then(function(res){
						console.log(res)
						
					})
					
					//关闭
					this.$refs.popDialog[0].close()
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
	margin-left: 20rpx;
	margin-bottom: 15rpx;
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
	justify-content: space-between;
	align-items: center;
	/* padding-left:500rpx ; */
}
.btns-1{
	margin-left: 20rpx;
}
.btns-2{
	margin-right: 20rpx;
}

/* 对话框 */
.dialog {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialog text {
  margin-bottom: 10px;
}

.dialog input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.dialog button {
  background-color: #FE4355;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dialog button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>