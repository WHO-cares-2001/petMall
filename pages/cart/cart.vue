<template>
	<view class="container">
		<!-- 如果有数据展示template里面的内容，没有数据就显示一行字 -->
		<template v-if="list.length>0">
			
			<!-- 导航栏 -->
			<uni-nav-bar  rightText="管理" title="购物车" :border="false"/>
			
			<!-- 商品内容 -->
			<view class="shop-list">
				<view class="shop-item" v-for="(i,index) in byshopList" :key="index"
				>
					<view class="g-header">
						<uni-icons type="shop" size="27" color="#FE4355"></uni-icons>
						<text class="name">{{i[0].shopName}}</text>
					</view>
					
					<view class="shops-goods" v-for="item in i" :key="item.id">
						<view class="g-body">
								<!-- 多选框 -->
								<label class="radio" @tap="selectedItem(item.id)">
									<radio value="" color="#FF3333" :checked="item.checked"/>
									<text></text>
								</label>
								
								<image :src="petPath+item.img" mode="" 
								class="shop-img"@tap="callGoDetail(item)">
								</image>
								
								<view class="shop-text">
									<view class="" >
										<view class="shop-name" >
											<view @tap="callGoDetail(item)">{{item.name}}</view>
											
											<uni-icons type="trash-filled" size="25"
											color="grey" @tap="del(item.id)"
											class="trash">
											</uni-icons>
											
										</view @tap="callGoDetail(item)">
										<view class="shop-option">
											<!-- {{item.option}} -->
										</view>
									</view>
									
									<view class="shop-price">
										<view class="price-color" @tap="callGoDetail(item)">
											￥{{item.pprice}}
										</view>
										<view class="">
											<uni-number-box :min="1" :max="maxJudge(item.goodsType)" :value="judgeNum(item.number)" 
											background="#fff" @change="onNumberChange($event,item.id)"/>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
			</view>
			
			<!-- 底部结算 -->
			<view class="shop-foot">
				<label class="radio rtext" @tap="selectAll">
					<radio value="" color="#FF3333" :checked="checkedAll" /><text>全选</text>
				</label>
				
				<view class="foot-total">
					<view class="foot-count">
						合计：<text class="total-price" >￥{{totalCount.pprice}}</text>
					</view>
					<!-- <button  @tap="goBuy" class="">结算</button> -->
					<view class="outside">
						<view class="foot-num" @tap="goBuy">
							结算
							<!-- （{{totalCount.num}}） -->
						</view>
					</view>
				</view>
			</view>
		</template>
		
		<!-- 无数据时 显示一行字-->
		<template v-else>
			<view>
				<TopBar bar-title="购物车"></TopBar>
				
				<view class="shop-else-list">
					<text>购物车还是空的~</text>
				</view>
			</view>
			
		</template>
	</view>
</template>

<script>
	import TopBar from '../../components/common/topBar.vue'
	import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
	import {
		getCart,deleteCart,addCart,addUpdate,minusUpdate,update
	} from "../../network/modules/cart.js";
	import {goDetail} from '@/common/sharedMethods.js'
	
	
	export default {
		components:{
			TopBar
		},
		data() {
			return {
				manage:false,
				petPath:"../../static/petImgs/",
				id:'',
				numbers:'',
				oldNum:null,
				byshopList:[],
				//这个页面用的
				// byshopList2:[]
			};
		},
		computed:{
			...mapState({
				a:state=>state.cart.a,
				username: state => state.username,
				list:state=>state.cart.list,
				// byshopList:state=>state.cart.byshopList,
				//选中的商品
				selectedList:state=>state.cart.selectedList
			}),
			...mapGetters(['checkedAll','totalCount','getbyshopList'])
		},
		methods:{
			//进入确认订单
			goBuy(){
				console.log(this.selectedList)
				if( this.selectedList.length === 0 ){
					return uni.showToast({
						title:"请至少选择一件商品",
						icon:"error"
					})
				}
				
				// 把选中的商品具体信息都传过去
				uni.navigateTo({
					// url: '../buy/buy?detail='+goods
					url:`../buy/createOrder?detail=${JSON.stringify(this.selectedList)}`
				});
				
			},
			...mapActions(['selectAll']),
			...mapMutations(['selectedItem','updateList','delOnebyshopList']),
			judgeNum(num){
				this.oldNum=num;
				return num;
			},
			goodsByShopId(data){
				const shopIdMap = new Map();
				
				  // 遍历原始数组
				  data.forEach(item => {
				    const shopId = item.shopId;
				
				    // 检查是否已经有相同 shopId 的数组，如果没有则创建一个新数组
				    if (!shopIdMap.has(shopId)) {
				      shopIdMap.set(shopId, []);
				    }
				
				    // 将商品添加到对应的数组中
				    shopIdMap.get(shopId).push(item);
				  });
				
				  // 将 Map 转换为数组，即按照 shopId 分组的数组
				  const result = [...shopIdMap.values()];
				  console.log(result)
				  this.byshopList=result
				  
				  //放入vuex
				  let temp=JSON.stringify(this.byshopList)
				  // this.$store.commit('getbyshopList',temp)
			},
			getAll(){
				let self=this
				this.id=localStorage.getItem('userId');
				console.log(typeof(this.id))
				
				getCart(this.id)
				.then(function(res){
					console.log(res.data); // 输出完整的响应对象，以便查看数据结构
					self.$store.commit('updateList', res.data)
					
					self.goodsByShopId(res.data)
				})
				.catch(function(err){
					console.log(err)
				})
			},
			//判断购物车最大数量
			maxJudge(goodsType){
				// console.log(goodsType)
				//pet
				if(goodsType===0){
					return 1;
				}else if(goodsType===1){
					//stuff限购5个
					return 20;
				}
			},
			callGoDetail(item){
				let id=null
				// console.log(item)
				if(item.goodsType===0){
					id=item.animalId
					
					console.log(id)
				}
				else if(item.goodsType===1){
					id=item.stuffId
			
					//console.log(typeof(data.stuffId))
				}
				
				console.log(id,parseInt(item.goodsType))
				goDetail(id,parseInt(item.goodsType),null)
				// console.log(id,type,shopId);
			},
			del(id){
				let self=this
				
				deleteCart(id)
				.then(function(res){
					console.log(res); // 输出完整的响应对象，以便查看数据结构
					self.$store.commit('delList', id);
					// self.$store.commit('delOnebyshopList', id);
					self.getAll();
				})
			},
			changeValue(value) {
				console.log('返回数值：', value)
				console.log(this.oldNum)
				
				if(this.oldNum>value){
					console.log('减少')
				}
				else if(this.oldNum<value){
					console.log('增加')
				}
				
			},
			onNumberChange(value,id) {  
				console.log('返回数值：', value)
				console.log(id)
				
				this.update(value,id)
			},
			update(num,id){
				let self=this
				
				let data = {
				    "id":id,
					"number":num
				}
				console.log(data)
				
				update(data)
				.then(function(res){
					console.log(res);
				})
			},
			refreshByGo(){
				//通过跳转回原页面实现刷新
				uni.switchTab({
					url:'../cart/cart'
				})
			},
		},
		// mounted(){
		// 	this.getAll()
		// },
		//每次进入该页面都去后端获取
		onShow(){
			this.getAll()
		}
	}
</script>

<style scoped>
	page{
		background-color: #f5f5f5;
	}
	
.trash{
	
	position: absolute;
	right: 50rpx;
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


</style>
