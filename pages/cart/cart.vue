<template>
	<view>
		<!-- 如果有数据展示template里面的内容，没有数据就显示一行字 -->
		<template v-if="list.length>0">
			
			<!-- 导航栏 -->
			<uni-nav-bar  rightText="管理" title="购物车" :border="false"/>
			
			<!-- 商品内容 -->
			<view class="shop-list">
				
				<view class="shop-item" v-for="(item,index) in list" :key="index"
				>
				
					<!-- 多选框 -->
					<label class="radio" @tap="selectedItem(index)">
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
								color="#FE4355" @tap="del(item.id)"
								class="trash">
								</uni-icons>
								
							</view @tap="callGoDetail(item)">
							<view class="shop-option">
								<!-- {{item.option}} -->
							</view>
						</view>
						
						<view class="shop-price">
							<view class="" @tap="callGoDetail(item)">
								￥{{item.pprice}}
							</view>
							<view class="">
								<uni-number-box :min="1" :max="maxJudge(item.goodsType)" :value="judgeNum(item.number)" 
								background="white" @change="onNumberChange($event,item.id)"/>
							</view>
							
						</view>
					</view>
				</view>
			</view>
			
			<!-- 底部结算 -->
			<view class="shop-foot">
				<label class="radio" @tap="selectAll">
					<radio value="" color="#FF3333" :checked="checkedAll"/><text>全选</text>
				</label>
				
				<view class="foot-total">
					<view class="foot-count">
						合计：<text style="color: #49BDFB;">￥{{totalCount.pprice}}</text>
					</view>
					<view class="foot-num" @tap="goBuy">
						结算（{{totalCount.num}}）
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
				
			};
		},
		computed:{
			...mapState({
				a:state=>state.cart.a,
				username: state => state.username,
				list:state=>state.cart.list,
				
				//选中的商品
				selectedList:state=>state.cart.selectedList
			}),
			...mapGetters(['checkedAll','totalCount'])
		},
		methods:{
			//进入确认订单
			goBuy(){
				console.log(this.selectedList)
				if( this.selectedList.length === 0 ){
					return uni.showToast({
						title:"请至少选择一件商品",
						icon:"none"
					})
				}
				
				
				// 把选中的传过去
				uni.navigateTo({
					// url: '../buy/buy?detail='+goods
					url:`../buy/createOrder?detail=${JSON.stringify(this.selectedList)}`
				});
				
			},
			...mapActions(['selectAll']),
			...mapMutations(['selectedItem','updateList']),
			judgeNum(num){
				this.oldNum=num;
				return num;
			},
			getAll(){
				let self=this
				this.id=localStorage.getItem('userId');
				console.log(typeof(this.id))
				
				getCart(this.id)
				.then(function(res){
					console.log(res.data); // 输出完整的响应对象，以便查看数据结构
					self.$store.commit('updateList', res.data)
						
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
					  // if (res.status === 200) {
						self.$store.commit('delList', id);
				
						// console.log(res.data); 
						
					  // }
					// self.list=res.data
					
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
		},
		mounted(){
			this.getAll()
		}
		
	}
</script>

<style scoped>
.trash{
	
	position: absolute;
	right: 50rpx;
}

//这样可以看到最底下的那个商品卡片
.shop-list{
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
	display: flex;
	padding: 20rpx;
	align-items: center;
	background-color: #F7F7F7;
	margin-bottom: 10rpx;
}

.shop-img{
	width: 200rpx;
	height: 200rpx;
}

.shop-price{
	display:flex;
	justify-content: space-between;
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
	bottom: 100rpx;
	left: 0;
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	//
	background-color: #FFFFFF;
}
.foot-total{
	display: flex;
	
}
.foot-count{
	padding: 0 20rpx;
	line-height: 100rpx;
}
.foot-num{
	background-color: #49BDFB;
	color: #FFFFFF;
	padding: 0 30rpx;
	line-height: 100rpx;
}
.radio{
	padding:0 10rpx;
}
</style>
