<template>
	<view class="index">
		<view class="red">
			
			<uni-row >
				<uni-col :span="6">
					<view class="title">宠物商城</view>
				</uni-col>
				<uni-col :span="18">
					<view >
						<uni-search-bar @confirm="search"
						@input="input" placeholder="搜宠物">
						</uni-search-bar>				
					</view>
				</uni-col>
			</uni-row>
			
			
			
			<!-- <uni-grid :column="4" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in category" :index="index" :key="index">
					<view class="grid-item-box" >
						 -->
						<!-- <uni-icons type="image" :size="30" color="#777" /> -->
						<!-- <image style="width: 80px; height: 60px;" 
						:src="'../../static/icon/cat1.png'" >
						</image>
						<text class="text">{{item}}</text>
					</view>
				</uni-grid-item>
			</uni-grid> -->
							
			<!-- 整个分类部分 -->
			<view class="icons">
				<!-- 每个分类项 -->
				<view class="icons-item" v-for="(item,index) in category" 
				:index="index" :key="index" @tap="goCategorySelect(index)">
					<image class="icons-img" :src="path+cateImgs[index]" mode=""></image>
					<text class="icons-name">{{item}}</text>
				</view>
			</view>
			
		</view> <!-- 红色区域结束-->
				
		<view class="cards">
			<!-- <view class="cards-item">
				<uni-row>
					<uni-col :span="18" class="cards-item-left">
						热门宠物
					</uni-col>
					<uni-col :span="4" class="cards-item-right">
						查看全部
					</uni-col>
					<uni-col :span="2" class="cards-item-iocn">
						<uni-icons type="forward" size="18">
						</uni-icons>
					</uni-col>
				</uni-row>
			</view> -->
			
			<view class="cards-item" @tap="goPetStuff">
				<uni-row>
					<uni-col :span="18" class="cards-item-left">
						宠物周边
					</uni-col>
					<uni-col :span="4" class="cards-item-right">
						查看全部
					</uni-col>
					<uni-col :span="2" class="cards-item-iocn">
						<uni-icons type="forward" size="18">
						</uni-icons>
					</uni-col>
				</uni-row>
			</view>			
		</view><!-- 宠物周边区域结束-->
		
		<uni-row>
			<uni-col :span="12" 
			v-for="(item,index) in items" :key="index" :index="index">
				
				<!-- 用margin改uni-card的外边距 -->
				<uni-card padding="0" spacing="0" margin="15rpx" 
				@tap='callGoDetail(item.id,0,item.shopId)'>
				
					<template v-slot:cover>
						<view class="custom-cover" @tap='callGoDetail(item.id,0,item.shopId)'>
							<image class="pet-img" 
							mode="aspectFit" 
							:src="petPath+item.img">
							</image>
							
						</view>
					</template>
					
					<uni-list>
						<uni-list-item :title="item.typeName">
							<template v-slot:footer>
								<text class="slot-text" >
									￥{{item.price}}
								</text>
								
							</template>
						</uni-list-item>
					</uni-list>
					
				</uni-card>
				
			</uni-col>
		</uni-row>
		
	</view>
</template>

<script>
	import GoodsList from '../../components/common/GoodsList.vue'
	
	import {goDetail} from '@/common/sharedMethods.js'
	import {
		showAnimal
	} from "../../network/modules/index.js";
	
	export default {
		components:{
			GoodsList
		},
		data() {
			return {
				title: 'Hello',
				category:[
					"附近",
					"猫猫",
					"狗狗",
					"异宠"
				],
				path:"../../static/icon/",
				petPath:"../../static/petImgs/",
				cateImgs:[
					"../../static/icon/position.png",
					"../../static/icon/cat.png",
					"../../static/icon/dog.png",
					"../../static/icon/bird2.png"
				],
				price:"￥2000.0",
				items:[],
			}
		},
		onLoad() {

		},
		methods: {
			//输入框跟踪，res是输入内容,输入框内容改变就打印
			input(res) {
				console.log('----input:', res)
			},
			
			//回车后进行搜索
			search(res){
				console.log("搜索",res.value);
				let string=res.value
				
				uni.navigateTo({
				  url: '../searchResults/searchResults?name='+string
				});
			},
			goPetStuff(){
				uni.navigateTo({
				  url: '../petStuff/petStuff'
				});
			},
			callGoDetail(id,type,shopId){
				goDetail(id,type,shopId)
				// console.log(id,type,shopId);

				console.log(id)
			},
			// goDetail(){
			// 	uni.navigateTo({
			// 		url:'../goodsDetail/goodsDetail'
			// 	})
			// 	console.log('goodsDetail')
			// },
			goCategorySelect(index){
				if(index===0){
					//去地图
					uni.navigateTo({
					  url: '../map/map'
					});
				}else{
					uni.navigateTo({
						url:'../categorySelect/categorySelect?num='+index
					})
				}
				
			}
		},
		mounted(){
			let self=this
			
			showAnimal()
			.then(function(res){
				// console.log(res); // 输出完整的响应对象，以便查看数据结构
				  if (res.status === 200) {
					console.log(res.data); // 输出响应数据，以便查看实际返回的数据结构
				  }
				self.items=res.data
			})
			.catch(function(err){
				console.log(err)
			})
		}
	}
</script>

<style lang="scss">
	//呃呃，颜色不要加分号就好了
.red{
	background-color: #FE4355;
}

.icons{
	//弹性布局
	display: flex;
	//可换行
	flex-wrap: wrap;
}

.icons-item{
	//一行四个，每个25%
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 20rpx;
	padding-bottom: 30rpx;
}

.icons-img{
	width: 90rpx;
	height: 90rpx;
	margin-bottom: 10rpx;
}

.icons-name{
	color: white;
}

.title{
	color: white;
	font-size: 40rpx;
	padding-top: 28rpx;
	padding-left: 25rpx;
	//font-family: "sans-serif";
}

.cards-item{
	padding: 30rpx 0 0 30rpx;
}
.cards-item-2{
	padding: 5rpx 0 0 30rpx;
}

.cards-item-right{
	padding: 8rpx;
	font-size: 25rpx;
}

.cards-item-iocn{
	padding: 7rpx;
}

.slot-text{
	color: red;
}
.cover-image{
	width: 310rpx;
	height: 340rpx;
}

.list-img{
	width: 30rpx;
	height: 30rpx;
}
.pet-img{
	margin: 0 20rpx;
	width: 310rpx;
	height: 340rpx;
}
</style>
