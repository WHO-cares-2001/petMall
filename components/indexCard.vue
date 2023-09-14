<template>
	<view>
		
		<!-- 卡片 -->
		<!-- 周边  1-->
		<view class="grey" v-if="type==1">
			<view class="guess-section">
				<view 
					v-for="(item, index) in items" :key="index"
					class="guess-item"
					@tap='callGoDetail(item.id,1,item.shopId)'
				>
					<view class="image-wrapper">
						<image :src="petPath+item.imgs" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.stuffName}}</text>
					<text class="price">￥{{item.price}}</text>
				</view>
			</view>
		</view>
		
		<!-- 宠物  0-->
		<view class="grey" v-if="type==0">
			<view class="guess-section">
				<view 
					v-for="(item, index) in items" :key="index"
					class="guess-item"
					@tap='callGoDetail(item.id,0,item.shopId)'
				>
					<view class="image-wrapper">
						<image :src="petPath+item.img" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.name}}</text>
					<text class="price">￥{{item.price}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {goDetail} from '@/common/sharedMethods.js'
	
	export default {
		props:{
			items:{
				type:Array,
				required:true
			},
			type:{
				type:Number,
				required:true
			}
		},
		name:"indexCard",
		data() {
			return {
				petPath:"../../static/petImgs/",
				
			};
		},
		methods: {
		  callGoDetail(id,type,shopId){
		  	goDetail(id,type,shopId)
		  	console.log(id,type,shopId);
		  
		  	// console.log(id)
		  },
		}
	}
</script>

<style scoped lang="scss"> 
	.grey{
		background: #F7F7F7;
	}
	
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 20upx;
		background: #f5f5f5;
		.guess-item{
			background: #fff;
			display:flex;
			flex-direction: column;
			width: 49%;
			margin-bottom: 20upx;
			padding-bottom: 30upx;
			border-radius: 10upx;
			// margin-right: 5upx;
			// margin-left: 5upx;
			
			&:nth-child(2n+1){
				margin-right: 2%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg-like;
			color: $font-color-dark-like;
			line-height: 80upx;
			padding: 0 0 0 20upx;
			// padding-left: 10upx;
		}
		.price{
			font-size: $font-lg-like;
			color: $uni-color-primary-like;
			line-height: 1;
			padding: 0 0 0 20upx;
		}
	}
</style>