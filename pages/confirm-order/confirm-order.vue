<template>
	<view class='confirm-order bg-active-color'>
		<Lines></Lines>
		
		<!--地址-->
		<view class='order-map' @tap='goPathList'>
			<template v-if='path'>
				<view class='map-title'>
					<view class='map-name'>收件人：{{path.name}}</view>
					<view>{{path.tel}}</view>
				</view>
				<view class='map-city'>收货地址：{{path.province}} {{path.city}} {{path.district}} {{path.address}}</view>
			</template>
			<template v-else>
				<view class='map-title'>
					<view class='map-name'>请选择地址</view>
				</view>
			</template>
		</view>
		
		<!--商品-->
		<view class='goods-list'>
			<view class='goods-content bg-active-color'
				v-for='(item,index) in goodsList'
				:key='index'
			>
				<image class='goods-img' :src='item.imgUrl' mode=""></image>
				<view class='goods-text'>
					<view class='goods-name'>{{item.name}}</view>
					<view class='goods-size f-color'>颜色分类：黑色</view>
					<view class='f-active-color' style='font-size:24rpx'>7天无理由</view>
				</view>
				<view>
					<view>¥{{item.pprice}}</view>
					<view class='f-color'>*{{item.num}}</view>
				</view>
			</view>
		</view>
		<!--底部 : 提交订单-->
		<view class='order-foot'>
			<view class='total-price'>合计：<text class='f-active-color'>¥{{totalCount.pprice}}</text></view>
			<view class="confirm" @tap='goPayment'>提交订单</view>
		</view>
		
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	import {mapGetters,mapState} from 'vuex'
	export default {
		data() {
			return {
				path:false
			}
		},
		computed:{
			...mapState({
				list:state=>state.cart.list
			}),
			...mapGetters(['defaultPath','totalCount']),
			//根据商品列表找到对应e.detail 数据的 id  最终返回商品数据
			goodsList(){
				return this.item.map(id=>{
					return this.list.find(v=>v.id == id);
				})
			}
		},
		onLoad(e) {
			
			//选中的商品id集合  [2,9]
			this.item = JSON.parse(e.detail);
			
			//如果有默认地址的一个赋值
			if(this.defaultPath.length){
				this.path = this.defaultPath[0];
			}
			
			//如果出发自定义事件，on去接受值
			uni.$on("selectPathItem",(res)=>{
				this.path = res;
			})
		},
		onUnload() {
			uni.$off('selectPathItem',()=>{
				console.log('移除了selectPathItem');
			})
		},
		components:{
			Lines
		},
		methods: {
			//跳转到地址管理页面
			goPathList(){
				uni.navigateTo({
					url:'../my-path-list/my-path-list?type=selectedPath'
				})
			},
			//确认支付
			goPayment(){
				uni.navigateTo({
					url:'../payment/payment'
				})
			}
		}
	}
</script>

<style scoped>
.confirm-order{
	position: absolute;
	left:0;
	top:0;
	rigth:0;
	bottom:0;
	width:100%;
	height: 100%;
}
.order-map{
	padding:20rpx;
	background-color: #FFFFFF;
	line-height: 40rpx;
}
.map-title{
	display: flex;
	justify-content: space-between;
}
.map-name{
	font-weight: bold;
}

.goods-list{
	margin-top:20rpx;
	background-color: #FFFFFF;
	padding:20rpx 0;
}
.goods-content{
	margin-top:20rpx;
	padding:10rpx 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.goods-text{
	width:360rpx;
	padding:0 10rpx;
	font-size:26rpx;
}
.goods-img{
	width:160rpx;
	height:160rpx;
}
.goods-name{
	font-size:26rpx;
}
.goods-size{
	font-size:24rpx;
}
.order-foot{
	height: 80rpx;
	width:100%;
	position: fixed;
	bottom:0;
	left:0;
	background-color: #FFFFFF;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.total-price{
	padding:0 20rpx;
}
.confirm{
	color:#FFFFFF;
	background-color: #49BDFB;
	padding:10rpx 30rpx;
}
</style>
