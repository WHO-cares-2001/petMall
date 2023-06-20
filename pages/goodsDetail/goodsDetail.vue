<template>
	<view class="all-detail">
		<!-- 顶部导航栏 -->
		<TopBar barTitle="商品详情页" @click-left='callGoIndex()'></TopBar>
		
		
		<view class="detail">
			
			<view class="" v-if="this.type==='1'">
				<image class="detail-img-1"
				:src="'../../static/petImgs/'+detailInfo.imgs"
				mode="aspectFit">
				</image>
			</view>
			
			
			<view class="" v-if="this.type==='0'">
				<swiper :loop="true" indicator-active-color="#FE4355"
				indicator-dots="true" class="swiper">
				  <swiper-item>
					<image :src="'../../static/petImgs/'+detailInfo.img" 
					class="detail-img"  mode="aspectFit">
					</image>
				  </swiper-item>
				  <swiper-item>
					<video class="goods-video"
					:src="'../../static/petImgs/'+videoPath" controls>
					</video>
				  </swiper-item>
				</swiper>
			</view>
			
			<!-- 价格等详情 -->
			<view class="detail-goods">
				<view class="goods-price">
					￥ {{detailInfo.price}}
				</view>
				<view class="goods-name">
					{{detailInfo.name}}
				</view>
				
				
				<view class="tags" v-if="this.type==='0'">
					<view class="tag-view">
						<uni-tag :inverted="true" :text="'性别：'+detailInfo.sex" type="error" />
					</view>
					<view class="tag2">
						<uni-tag :inverted="true" :text="detailInfo.birth" type="warning" />
					</view>
					<view class="tag2">
						<uni-tag :inverted="true" :text="detailInfo.age" type="warning" />
					</view>
				</view>
				
				<view class="intro">
					<text>【宝贝介绍】：</text>
					<text>{{detailInfo.introduction}}</text>
				</view>
				
			</view>
			<!-- 宠物介绍结束 -->
		</view>
		
		<!-- 商家 -->
		<view class="shop-item">
			<uni-list>
				<uni-list-item :title="shopInfo.shopName" 
				:note="shopInfo.address" showArrow
				:thumb="'../../static/petImgs/'+shopInfo.img"
				thumb-size="lg" rightText="详情" link
				@click="goShop"
				/>
			</uni-list>
		</view>
		
		<!-- 底部导航栏 -->
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" 
			@click="onClick"
			@buttonClick="buttonClick" />
		</view>
		
	</view>
</template>

<script>
import TopBar from '../../components/common/topBar.vue'

import {goIndex,goBack} from '@/common/sharedMethods.js'
import {
	shop,stuffById,animalById,videoById
} from "../../network/modules/goodDetail.js";

import {
	addCart
} from "../../network/modules/cart.js";
	
import {
	addFavor
} from "../../network/modules/collection.js";
	
export default {
	components:{
		TopBar
	},
	data() {
		return {
			options: [
			{
				icon: 'shop',
				text: '店铺',
				info: 0,
				infoBackgroundColor: '#007aff',
				infoColor: "#f5f5f5"
			}, {
				icon: 'star',
				text: '收藏',
				info: 0
			}],
			buttonGroup: [{
					text: '加入购物车',
					backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}
			],
			detailInfo:
			{
				price:2399,
				name:"柯基",
				age:"2个月",
				birth:"未绝育",
				sex:"公",
				img:"",
				introduction:"性格活泼，爱撒娇，忠诚，憨厚。"
			}
			,
			type:'',
			shopId:'',
			goodsId:'',
			videoPath:'',
			shopInfo:[],
			userId:'',
		}
	},
	methods: {
		onClick(e) {
			// console.log(e)
			this.userId=localStorage.getItem('userId');
			
			if(e.index===1){
				//console.log(this.detailInfo)
				let data = {
				    "animalId": null,
				    "userId": null,
				    "goodsId": 0,
					"stuffId": null
				}
				
				data.userId=this.userId
				if(this.type==='0'){
					data.goodsId=0
					data.animalId=this.detailInfo.id
					//console.log(typeof(data.animalId))
				}
				else if(this.type==='1'){
					data.goodsId=1
					data.stuffId=this.detailInfo.id
					//console.log(typeof(data.stuffId))
				}
				this.addCollection(data)
				
			}
		},
		buttonClick(e) {
			// console.log(e)
			this.userId=localStorage.getItem('userId');
			
			if(e.index===0){
				
				let data = {
				    "animalId": null,
				    "userId": null,
				    "goodsType": 0,
					"stuffId": null,
					"number":1
				}
				
				data.userId=this.userId
				if(this.type==='0'){
					data.goodsType=0
					data.animalId=this.detailInfo.id
					//console.log(typeof(data.animalId))
				}
				else if(this.type==='1'){
					data.goodsType=1
					data.stuffId=this.detailInfo.id
					//console.log(typeof(data.stuffId))
				}
				
				this.addGoods(data)
			}
			
		},
		addCollection(data){
			console.log(data)
			
			addFavor(data)
			.then(function(res){
				// console.log(res); 
				  
					console.log(res); 
					
					uni.showToast({
						title: `加入收藏成功`,
						icon: 'none'
					})
				  
			})
		},
		addGoods(data){
			console.log(data)
			
			addCart(data)
			.then(function(res){
				// console.log(res); 
				  
					console.log(res); 
					
					uni.showToast({
						title: `加入购物车成功`,
						icon: 'none'
					})
				  
				
			})
			
		},
		callGoIndex(){
			console.log('触发')
			goIndex();
			// goBack();
		},
		swiperChange(e) {
		  console.log('Current Swiper Index:', e.detail.current)
		},
		fetchPetData(type){
			let self=this
			
			if(type==='0'){
				//animal
				//console.log('fetchPetData')
				animalById(this.goodsId)
				.then(function(res){
					// console.log(res); 
						self.detailInfo=res.data
						//console.log(self.detailInfo)
						self.video(self.detailInfo.videoId,self)
						self.shop(self.detailInfo.shopId,self)
						//
					 
					
				})
				.catch(function(err){
					console.log(err)
				})
				
			}
			else if(type==='1'){
				//stuff
				stuffById(this.goodsId)
				.then(function(res){
					// console.log(res); 
					 
						// console.log(res.data.data); 
						self.detailInfo=res.data
						console.log(self.detailInfo)
						self.video(self.detailInfo.videoId,self)
						self.shop(self.detailInfo.shopId,self)
						//
					 
					
				})
			}
		},
		video(id,self){			
			console.log(id)
			
			videoById(id)
			.then(function(res){
				// console.log(res); 
				 
					//console.log(res.data); 
					self.videoPath=res.data.videoName
					console.log(self.videoPath)
				 
				
			})
			.catch(function(err){
				console.log(err)
			})
		},
		shop(shopId,self){
			
			shop(shopId)
			.then(function(res){
				// console.log(res); 
				  
					//console.log(res.data); 
					self.shopInfo=res.data
					//console.log(self.shopInfo)
				  
				
			})
		},
		goShop(){
			uni.navigateTo({
				url: '../shop/shop?shopId='+ this.shopId
			});
			  
		}
		
	},
	mounted() {
		var petId=parseInt(this.$route.query.id)
		this.goodsId=this.$route.query.id
		this.type=this.$route.query.type
		this.shopId=this.$route.query.shopId
		
		console.log(this.goodsId,this.type,this.shopId)
		
		console.log('mounted:id ',petId)
		this.fetchPetData(this.type);
		console.log(typeof(this.type))
		// this.video()
		
	}
}
</script>

<style>
.all-detail{
	background-color: #F7F7F7;
}
.goods-carts {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	/* #ifdef H5 */
	left: var(--window-left);
	right: var(--window-right);
	/* #endif */
	bottom: 0;
},
.top-bar{
	position: sticky;
}
.detail-img{
	width: 100%;
	/* height: 500rpx; */
	
}
.detail-img-1{
	width: 100%;
	margin: 20rpx 0;
}

.detail-goods{
	text-align: center;
	/* font-weight: bold; */
	font-size: 36rpx;
	padding: 10rpx 0;
	border-radius:10rpx 20rpx ;
	/* margin: 20rpx 20rpx; */
	margin: 0 20rpx 20rpx;
	/* background-color: #F7F7F7; */
	background-color: white;
}
.goods-price{
	color: red;
}
.goods-name{
	margin:10rpx 0;
}
.tags{
	display: flex;
	justify-content: center;
	padding-bottom: 20rpx;
}

.tag2{
	padding-left: 30rpx;
}

.shop-item{
	background-color: white;
	margin: 0 20rpx 30rpx;
	border-radius:10rpx 20rpx ;
	
}
.intro{
	margin-bottom: 30rpx;;
}
.swiper{
	height: 530rpx;
}
.goods-video{
	margin: 10rpx 70rpx;
}

</style>
