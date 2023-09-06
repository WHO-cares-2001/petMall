<template>
	<view>
		<TopBar barTitle="附近商店" @click-left='callGoIndex()'></TopBar>
		
		<!-- <button type="default" @click="getCurrentLocation()">获取当前位置</button> -->
		<button type="primary" @click="getaddress()">选择当前位置</button>
		<view style="color: red;" class="pos">
			{{positionInfo.address}}
		</view>
		
		<view class="shop-item">
			<uni-list>
				<uni-list-item :title="shopInfo.shopName" 
				:note="shopInfo.address" showArrow
				:thumb="'../../static/petImgs/'+shopInfo.img"
				thumb-size="lg" rightText="详情" link
				@click="goShop(shopInfo.id)" class="shop-text"
				v-for="(shopInfo,index) in shopList"
				:key="index"
				/>
				
			</uni-list>
		</view>
	</view>
</template>
 
<script>
	import {
		nearbyShops
	} from "../../network/modules/map.js";
	import {goIndex,goBack} from '@/common/sharedMethods.js'
	import TopBar from '../../components/common/topBar.vue'
	
	
	export default {
		components:{
			TopBar
		},
		data() {
			return {
				positionInfo: {
					address: '',
					longitude: '', //经度
					latitude: '', //纬度
				},
				shopList:[],
				
			}
		},
		methods: {
			// 通过自带的方法获取到当前的经纬度，调用方法获取到地址获取到地址的中文信息
			getCurrentLocation() {
				
				let that = this //在uniapp中药定义一下this才能使用
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
					success: function(res) {
						that.positionInfo.longitude = res.longitude;
						that.positionInfo.latitude = res.latitude;
						that.loAcquire(that.positionInfo.longitude,that.positionInfo.latitude)
					}
				});
			},
			// 获取当前地址
			loAcquire(longitude, latitude) {
				let that = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				});	
				//https://apis.map.qq.com/ws/geocoder/v1/?location=24.6218,118.0805&key=F2XBZ-SCM3G-W53Q3-QVSOB-NUXBO-TDBUI
				let str = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=F2XBZ-SCM3G-W53Q3-QVSOB-NUXBO-TDBUI` 
				console.log(str)
				
				that.$jsonp('https://apis.map.qq.com/ws/geocoder/v1/?location=24.6218,118.0805&key=F2XBZ-SCM3G-W53Q3-QVSOB-NUXBO-TDBUI')
				.then(res => {
					console.log(1)
					uni.hideLoading();
					if (res.status == 0) {
						//that.positionInfo.address = '当前位置是:' + res.result.address_component.street_number; //当前定位
					}
				})
				.catch(err => {
					console.log(err)//代码错误、请求失败捕获
				})
		
			},
			// 获取选择地址
			getaddress() {
				let that = this
				
				var str;
				
				uni.chooseLocation({
					success: function(res) {			
						
						that.positionInfo.address = '你选择的位置是：' 
						+ res.address.substring(0,res.address.indexOf('市'));

						str=res.address.substring(0,res.address.indexOf('市'));
						
						nearbyShops(str)
						.then(function(res){
							console.log(res.data);
							that.shopList=res.data
						})	
					}
				});
						
				
			},
			callGoIndex(){
				// console.log('触发')
				goIndex();
			},
			goShop(id){
				uni.navigateTo({
					url: '../shop/shop?shopId='+ id
				});
				  
			},
			/*api(address){
				let self=this
				
				nearbyShops(address)
				.then(function(res){
					console.log(res);
						
				})
			},*/
		}
	}
</script>
 
<style scoped>
	button{
		margin: 40px;
	}
	.pos{
		margin-left:40px;
	}
</style>