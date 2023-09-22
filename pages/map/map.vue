<!-- <template>
	<view>
		
		<TopBar barTitle="地址" @click-left='goBack()'></TopBar>
		
		<view class="map-container">
			<map style="width: 100%; height: 500px;" :show-location='true' ref="map" id="map" :latitude="latitude"
				:longitude="longitude" :markers="marker" :scale="scale" @markertap="markertap" @callouttap='callouttap'>
			</map>
			
			<form>
			  <view class="form-item">
			    <text>起点：</text>
			    <input v-model="formData.begin" type="text" placeholder="请输入起点" />
			  </view>
			  <view class="form-item">
			    <text>终点：</text>
			    <input v-model="formData.end" type="text" placeholder="请输入终点" />
			  </view>
			  <button @click="planRoute(formData)">规划路线</button>
			</form>
			
		</view>
	</view>
</template>
 
<script>
	import {goBack} from '@/common/sharedMethods.js'
	import TopBar from '../../components/common/topBar.vue'
	
	export default {
		components:{
			TopBar
		},
		 mounted(){
		   var that=this;
		   this.$axios.get('http://localhost:8899/demo/show/shop').then(function (resp){
		      that.marker=resp.data.data
			  for(let i=0;i<resp.data.data.length;i++)
			  {
				  that.marker[i].id=i
				  that.marker[i].iconPath='/static/petImgs/'+resp.data.data[i].img
				  that.marker[i].width=20
				  that.marker[i].height=20
				  var callout={color: '#ffffff', fontSize: 15, borderRadius: 15, 
							padding: '10',bgColor: '#406390', display: 'ALWAYS',}
				  callout.content=resp.data.data[i].shopName
				  that.marker[i].callout=callout
			  }
		   })
		   
		  },
		data() {
			return {
			routeData: null,
			latitude: 24.619801, //纬度
			longitude: 118.083993, //经度
			scale: 5, //缩放级别
			marker: [],
			polyline:[],
			markers: [],
			formData:{
					  begin:'',
					  end:'',
			},
			tableData:[],
			}
		},
		onReady() {
 
		},
		computed: {},
		onLoad() {
 
		},
		onShow() {
			this.getLocation()
		},
		methods: {
			goBack(){
				goBack()
			},
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						this.latitude = res.latitude
						this.longitude = res.longitude
					}
				});
			},
			refresh() {
				this.getLocation()
				console.log('刷新');
				//后期这里可加入调用请求接口的方法，用来实现刷新
			},
			//定位
			onControltap() {
				this.getLocation()
				uni.createMapContext("map", this).moveToLocation({ //moveToLocation将地图中心移动到当前定位点，需要配合map组件的show-location使用
					latitude: this.latitude,
					longitude: this.longitude,
				});
			},
			//地图点击事件
			markertap(e) {
				console.log("你点击了标记点", e)
			},
			//地图点击事件
			callouttap(e) {
				console.log('你点击了气泡标签', e)
			},
			planRoute() {
			// 发送请求到后端代理
			for(let i=0;i<this.marker.length;i++)
			{
				if(this.marker[i].callout.content==this.formData.begin)
				{
					this.formData.begin=this.marker[i].latitude+','+this.marker[i].longitude
					console.log(this.formData.begin)
				}
				if(this.marker[i].callout.content==this.formData.end)
				{
					this.formData.end=this.marker[i].latitude+','+this.marker[i].longitude
					console.log(this.formData.end)
				}
			}
			uni.request({
				url: 'http://localhost:3000/planRoute', // 后端代理地址
				method: 'GET',
				data: {
				// 传递给后端的参数，例如起点、终点等
				from: this.formData.begin, // 起点坐标
				to: this.formData.end,   // 终点坐标
				},
				success: (res) => {
				this.routeData = res.data.result.routes[0];
				const table=res.data.result.routes[0].steps;
				for(let i=0;i<table.length;i++)
				{
					this.tableData[i]=table[i].instruction
				}
				 uni.showActionSheet({
				                    itemList: this.tableData,
				                   
				                });
				},
				fail: (err) => {
				console.error(err);
				},
			});
   
		},
		}
	}
</script>
 
<style scoped lang="scss">
	.map-container {
		// margin-top: 10rpx;
		position: relative;
		overflow: hidden;
		border-radius: 50rpx 50rpx 0 0;
 
		.cover-view {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			/* width: 80rpx;
			height: 160rpx; */
			padding: 42rpx 22rpx;
			color: #4F575F;
			font-weight: 400;
			background-color: #fff;
			background-size: 120rpx 120rpx;
			background-position: center center;
			position: absolute;
			top: 150rpx;
			right: 32rpx;
			border-radius: 15rpx;
 
 
		}
 
		.cover-image {
			display: inline-block;
			width: 50rpx;
			height: 50rpx;
 
		}
	}
</style> -->

<template>
	<view>
		<!-- 顶部导航栏 -->
		<TopBar barTitle="地址" @click-left='goBack()'></TopBar>
		
		<view class="map-container">
			<map style="width: 100%; height: 500px;" :show-location='true' ref="map" id="map" :latitude="latitude"
				:longitude="longitude" :markers="marker" :scale="scale" @markertap="markertap" @callouttap='callouttap'>
			</map>
			
			<form>
			  <view class="form-item">
			    <text>起点：</text>
			    <input v-model="formData.begin" type="text" placeholder="请输入起点" />
			  </view>
			  <view class="form-item">
			    <text>终点：</text>
			    <input v-model="formData.end" type="text" placeholder="请输入终点" />
			  </view>
			  <button @click="planRoute(formData)">规划路线</button>
			</form>
			
		</view>
	</view>
</template>
 
<script>
	import {goBack} from '@/common/sharedMethods.js'
	import TopBar from '../../components/common/topBar.vue'
	
	export default {
		components:{
			TopBar
		},
		 mounted(){
		   var that=this;
		   this.$axios.get('http://localhost:8899/demo/show/shop').then(function (resp){
		      that.marker=resp.data.data
			  for(let i=0;i<resp.data.data.length;i++)
			  {
				  that.marker[i].id=resp.data.data[i].id
				  that.marker[i].iconPath='/static/petImgs/'+resp.data.data[i].img
				  that.marker[i].width=20
				  that.marker[i].height=20
				  var callout={color: '#ffffff', fontSize: 15, borderRadius: 15, 
							padding: '10',bgColor: '#406390', display: 'ALWAYS',}
				  callout.content=resp.data.data[i].shopName
				  that.marker[i].callout=callout
			  }
		   })
		   
		  },
		data() {
			return {
			routeData: null,
			latitude: 24.619801, //纬度
			longitude: 118.083993, //经度
			scale: 5, //缩放级别
			marker: [],
			polyline:[],
			markers: [],
			formData:{
					  begin:'',
					  end:'',
			},
			tableData:[],
			}
		},
		onReady() {
 
		},
		computed: {},
		onLoad() {
 
		},
		onShow() {
			this.getLocation()
		},
		methods: {
			goBack(){
				goBack()
			},
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						this.latitude = res.latitude
						this.longitude = res.longitude
					}
				});
			},
			refresh() {
				this.getLocation()
				console.log('刷新');
				//后期这里可加入调用请求接口的方法，用来实现刷新
			},
			//定位
			onControltap() {
				this.getLocation()
				uni.createMapContext("map", this).moveToLocation({ //moveToLocation将地图中心移动到当前定位点，需要配合map组件的show-location使用
					latitude: this.latitude,
					longitude: this.longitude,
				});
			},
			//地图点击事件
			markertap(e) {
				
					uni.navigateTo({
						url: '../shop/shop?shopId='+ e.detail.markerId
				});
				
			},
			//地图点击事件
			callouttap(e) {
				uni.navigateTo({
						url: '../shop/shop?shopId='+ e.detail.markerId
				});
			},
			planRoute() {
			// 发送请求到后端代理
			for(let i=0;i<this.marker.length;i++)
			{
				if(this.marker[i].callout.content==this.formData.begin)
				{
					this.formData.begin=this.marker[i].latitude+','+this.marker[i].longitude
					console.log(this.formData.begin)
				}
				if(this.marker[i].callout.content==this.formData.end)
				{
					this.formData.end=this.marker[i].latitude+','+this.marker[i].longitude
					console.log(this.formData.end)
				}
			}
			uni.request({
				url: 'http://localhost:3000/planRoute', // 后端代理地址
				method: 'GET',
				data: {
				// 传递给后端的参数，例如起点、终点等
				from: this.formData.begin, // 起点坐标
				to: this.formData.end,   // 终点坐标
				},
				success: (res) => {
				this.routeData = res.data.result.routes[0];
				const table=res.data.result.routes[0].steps;
				for(let i=0;i<table.length;i++)
				{
					this.tableData[i]=table[i].instruction
				}
				 uni.showActionSheet({
				                    itemList: this.tableData,
				                   
				                });
				},
				fail: (err) => {
				console.error(err);
				},
			});
   
		},
		}
	}
</script>
 
<style scoped lang="scss">
	.map-container {
		// margin-top: 10rpx;
		position: relative;
		overflow: hidden;
		border-radius: 50rpx 50rpx 0 0;
 
		.cover-view {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			/* width: 80rpx;
			height: 160rpx; */
			padding: 42rpx 22rpx;
			color: #4F575F;
			font-weight: 400;
			background-color: #fff;
			background-size: 120rpx 120rpx;
			background-position: center center;
			position: absolute;
			top: 150rpx;
			right: 32rpx;
			border-radius: 15rpx;
 
 
		}
 
		.cover-image {
			display: inline-block;
			width: 50rpx;
			height: 50rpx;
 
		}
	}
</style>