<!-- 商品详情页轮播视频和图片测试记录 -->
<template>
	<view class="all-detail">
		<!-- 顶部导航栏 -->
		<TopBar barTitle="商品详情页" @click-left='callGoIndex()'></TopBar>
		
		
		<view class="detail">
			<!-- <image class="detail-img" 
			src="../../static/petImgs/img/25.jpg" mode="aspectFit">
			</image> -->
			
			<swiper :loop="true" indicator-active-color="#FE4355" 
			indicator-dots="true" class="swiper">
			  <swiper-item>
				<image src="../../static/petImgs/img/25.jpg" 
				class="detail-img"  mode="aspectFit">
				</image>
			  </swiper-item>
			  <swiper-item>
				<video src="../../static/petImgs/pets/1.mp4" 
				controls class="goods-video">
				</video>
			  </swiper-item>
			</swiper>
			
			<!-- <uni-swiper-dot class="swiper" :indicator-dots="true" :autoplay="false" @change="swiperChange">
			  <swiper-item>
				<image src="../../static/petImgs/img/25.jpg"></image>
			  </swiper-item>
			  <swiper-item>
				<video src="../../static/petImgs/pets/1.mp4" controls></video>
			  </swiper-item>
			</uni-swiper-dot> -->
				
				
			<!-- <uni-swiper class="swiper">
			  <uni-swiper-item>
				<image class="detail-img" src="../../static/petImgs/img/25.jpg"></image>
			  </uni-swiper-item>
			  
			  <uni-swiper-item>
				<video src="../../static/petImgs/pets/1.mp4" controls></video>
			  </uni-swiper-item>
			</uni-swiper> -->
				
			
			<!-- 价格等详情 -->
			<view class="detail-goods">
				<view class="goods-price">
					￥ {{detailInfo.price}}
				</view>
				<view class="goods-name">
					{{detailInfo.name}}
				</view>
				
				<view class="tags">
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
				<uni-list-item title="店名" note="商店地址" showArrow
					thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
					thumb-size="lg" rightText="详情" />
			</uni-list>
		</view>
		
		<!-- 底部导航栏 -->
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
		
	</view>
</template>

<script>
</script>

<style>
</style>