<template>
	<view @tap="callGoDetail(pet.id,0,pet.shopId)">
		<!-- 商品内容 -->
		<view class="shop-list">
		    <view class="shop-item">
				<image :src="petPath+pet.img" mode="" class="shop-img"></image>
		
				<view class="shop-text">
					<view class="shop-name">
					  {{ pet.name }}
					</view>
					<view class="shop-option">
					  <!-- {{ pet.option }} -->
					</view>
					<view class="shop-price">
					  <view class="">
						￥{{ pet.price }}
					  </view>
					  
					</view>
		      </view>
		    </view>
		</view>
	</view>
			
</template>

<script>
	import {goDetail} from '@/common/sharedMethods.js'
	
export default {
  props: {
	pet: {
	  type: Object,
	  required: true
	}
  },
  data(){
	  return{
		  petPath:"../../static/petImgs/",
	  }
  },
  methods: {
    callGoDetail(id,type,shopId){
    	goDetail(id,type,shopId)
    	console.log(id,type,shopId);
    
    	// console.log(id)
    },
  }
};
</script>

<style scoped>
.shop-list{
	padding-bottom: 10rpx;
}

.shop-item{
	display: flex;
	padding: 20rpx;
	align-items: center;
	background-color: #F7F7F7;
	margin-bottom: 10rpx;
}

.shop-img{
	width: 200rpx;
	height: 200rpx;
	padding-left: 70rpx;
}

.shop-price{
	display:flex;
	justify-content: space-between;
	color: red;
}

.shop-option{
	font-size: 27rpx;
	color: #636263;
	padding:12rpx ;
}

.shop-text{
	flex:1;
	padding-left: 40rpx;
}
</style>