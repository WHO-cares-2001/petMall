<template>
	<view>
		<!-- 顶部导航栏 -->
		<view>
			<uni-nav-bar left-icon="left" title="订单详情" @clickLeft="goBack()" />
		</view>
		
		<!-- 地址 v-if如果没有地址，else有地址 -->
		<view class="" v-if="defaultPath.length===0">
			<navigator url="../address/address?source=1" class="address-section">
				<view class="order-content">
					<text class="yticon icon-shouhuodizhi"></text>
					<view class="cen">
						<view class="top">
							<text class="name">请选择地址</text>
							<text class="mobile"></text>
						</view>
						
					</view>
					<text class="yticon icon-you"></text>
				</view>
				<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
			</navigator>
		</view>
		
		<view class="" v-else>
			<navigator url="../address/address?source=1"  class="address-section">
				<view class="order-content">
					<text class="yticon icon-shouhuodizhi"></text>
					<view class="cen">
						<view class="top">
							<text class="name">{{defaultPath.addressName}}</text>
							<text class="mobile">{{defaultPath.tel}}</text>
							<text v-if="defaultPath.isDefault" class="tag">默认</text>
						</view>
						<text class="address">{{defaultPath.province}} {{defaultPath.adress}}</text>
					</view>
					<text class="yticon icon-you"></text>
				</view>
				<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
			</navigator>
		</view>


		<view class="order-item" v-for="(i,shopIndex) in goodsList" :key="shopIndex">
			<view class="goods-section" >
				<view class="g-header b-b">
					<uni-icons type="shop" size="30" color="#FE4355"></uni-icons>
					<text class="name">{{i[0].shopName}}</text>
				</view>
				
				<!-- 商品列表 -->
				<view class="g-item" v-for="(item,secondIndex) in i" :key="secondIndex">
					<image :src="'../../static/petImgs/'+item.img"></image>
					<view class="right">
						<text class="title clamp">{{item.name}}</text>
						<br>
						<!-- <text class="spec">春装款 M</text> -->
						<view class="price-box">
							<text class="price">￥{{item.pprice}}</text>
							<text class="number">x {{item.number}}</text>
						</view>
					</view>
				</view>
					
				<!-- 优惠明细 -->
				<view class="yt-list">
					<view class="yt-list-cell b-b" @click="toggleMask('show')">
						<view class="cell-icon">
							券
						</view>
						<text class="cell-tit clamp">优惠券</text>
						<text class="cell-tip active">
							选择优惠券
						</text>
						<text class="cell-more wanjia wanjia-gengduo-d"></text>
					</view>
					<view class="yt-list-cell b-b">
						<view class="cell-icon hb">
							减
						</view>
						<text class="cell-tit clamp">商家促销</text>
						<text class="cell-tip disabled">暂无可用优惠</text>
					</view>
				</view>
			</view>
			
			<!-- 金额明细 -->
			<view class="yt-list">
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">商品金额</text>
					<text class="cell-tip">￥{{orderItemtotalCount(shopIndex)}}</text>
				</view>
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">优惠金额</text>
					<!-- <view class="" v-if="isValid(i[0].discountsId)">
						<text class="cell-tip red">-￥{{i[0].discountMoney}}</text>
					</view>
					<view class="" v-else>
						<text class="cell-tip red">-￥0</text>
					</view> -->
						<text class="cell-tip red">-￥{{discount[shopIndex]}}</text>
				</view>
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">运费</text>
					<text class="cell-tip">免运费</text>
				</view>
				<view class="yt-list-cell desc-cell">
					<text class="cell-tit clamp">备注</text>
					<input class="desc" type="text" v-model="desc[shopIndex]" 
					placeholder="请填写备注信息" placeholder-class="placeholder" />
				</view>
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{totalCount.pprice}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>
		
		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期至2019-06-30</text>
						</view>
						<view class="right">
							<text class="price">{{item.price}}</text>
							<text>满30可用</text>
						</view>
						
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">限新用户使用</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addressList,adList
	} from "../../network/modules/address.js";
	import {mapGetters,mapState} from 'vuex';
	import {goBack} from '@/common/sharedMethods.js'
	import {
		add,addDetails,deleteCarts,isDiscountValid
	} from "../../network/modules/order.js";
	
	export default {
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				desc:[], //备注
				payType: 1, //1微信 2支付宝
				couponList: [
					{
						title: '新用户专享优惠券',
						price: 5,
					},
					{
						title: '庆五一发一波优惠券',
						price: 10,
					},
					{
						title: '优惠券优惠券优惠券优惠券',
						price: 15,
					}
				],
				addressData: {
					addressName: '许小星',
					tel: '13853989563',
					province: '山东省济南市历城区',
					adress: '149号',
					default: false,
				},
				addressId: 0, //收货地址ID
				defaultPath:[],//默认地址
				usersId:'',
				totals:[],//每个订单总金额
				orderIds:[],//每个订单的编号
				submitJson:[],
				flag:null,
				//放每个订单总折扣
				discount:[]
			}
		},
		onLoad(e){
			//商品数据
			//let data = JSON.parse(option.data);
			//console.log(data);
			this.para(e);
		},
		// onShow(){
		// 	this.para(e);
		// },
		methods: {
			goBack(){
				goBack()
			},
			//判断折扣时间是否有效
			isValid(id){
				let self=this
				console.log('discountsId:'+id)
				isDiscountValid(id)
				.then(function(res){
					console.log(res.data)
					self.flag=res.data
					if(self.flag==1){
						console.log('true')
						return true
					}else{
						return false
					}
				})
			},
			//显示优惠券面板
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type){
				this.payType = type;
			},
			//提交订单删除购物车里的这些商品
			cartIds(){
				// 创建一个空数组来存储所有的id
				const idList = []
				// 使用嵌套的循环遍历二维数组，并提取id字段
				for (const innerArray of this.goodsList) {
				    for (const item of innerArray) {
				        if (item.id) {
				            idList.push(item.id);
				        }
				    }
				}
				// 使用join方法将id数组拼接成逗号分隔的字符串
				const ids = idList.join(',')
				// 输出拼接结果
				console.log(ids)
				return ids
			},
			delCart(){
				let ids=this.cartIds()
				console.log(ids)
				
				deleteCarts(ids)
				.then(function(res){
					console.log(res)
					
				})
			},
			addOrderItem(){
				// console.log(Orders)
				this.everyOrderTotal()
				let len=this.totals.length
				//Order2是所有订单存放的数组
				let Orders2=[]
				for(let i=0;i<len;i++){
					//每个Orders再加个总折扣金额
					let Orders={
						userId:this.usersId,
						adressesId:this.defaultPath.id,
						money:null,
						remark:this.desc[i],
						state:0,
						totalDiscount:this.discount[i]
					}
					//算每个订单的总金额(实付款)
					Orders.money=this.totals[i]
					console.log('每个订单项：')
					console.log(Orders)
					Orders2.push(Orders)
				}
				console.log('所有订单项：')
				console.log(Orders2)
				
				let self=this
				//购物车商品ids
				let ids=this.cartIds()
				// Orders2.push(ids)
				console.log('增加订单项该传的数据：')
				// console.log(Orders2)
				let o={
					orders:Orders2,
					ids:ids
				}
				console.log(o)
				
				//提交订单以后删掉相应购物车内容
				this.delCart()
				
				//生成订单编号
				add(Orders2)
				.then(function(res){
					console.log(res.data); 
					self.orderIds=res.data
					//增加订单项 addDetails
					self.detail(self)
					
					uni.navigateTo({
						url: '/pages/payment/payment?money='+self.totalCount.pprice
						+'&ids='+JSON.stringify(self.orderIds)
					})
				})
			},
			detail(self){
				let len1=self.orderIds.length
				console.log(len1)
				for(let j=0;j<len1;j++){
					let arr=self.goodsList[j]
					for(let k=0;k<arr.length;k++){
						let ele=arr[k]
						let json={
							animalId:ele.animalId,
							num:ele.number,
							stuffId:ele.stuffId,
							goodsId:ele.goodsType,
							orderitemNumber:self.orderIds[j],
							shopId:ele.shopId,//加的
							moneys:ele.pprice*ele.number
						}
						console.log(json)
						self.submitJson.push(json)
						
						//添加订单项
						addDetails(json)
						.then(function(res){
							console.log(res.data)
						})
					}
				}
				console.log(self.submitJson)
			},
			submit(){
				console.log(this.defaultPath)
				if(Object.keys(this.defaultPath).length === 0){
					uni.showToast({
					  title: '地址不能为空',
					  icon: 'error',
					});
				}
				else{
					//提交订单需要在vuex删除一下被提交的这些商品
					this.goodsList.forEach((innerArray) => {
					  innerArray.forEach((item) => {
					    // 在这里执行删除操作，传递item的id给commit函数
						//而且买的如果是动物，变成禁买状态
					    // this.$store.commit('delList', item.id);
						
					  });
					});
					
					//传给后端
					this.addOrderItem()
				}
			},
			stopPrevent(){},
			para(e){
				
				console.log('购物车所有传过来的商品:'+e.detail)
				//this.item是所有传过来的商品
				this.item= JSON.parse(e.detail);
				//给item每个json加个备注
				if(Array.isArray(this.item)){
					this.item.forEach(i=>{
						this.desc.push('')
					})
				}else{
					// 如果 this.item 不是数组，将 this.desc 设置为空字符串
					  this.desc = ''
				}
				
				//找默认地址
				//有个bug，地址更改了不能实时更新
				let self = this;
				let Id = window.localStorage.getItem("userId");
				this.usersId=Id
				
				//找默认地址
				adList({
					userId: Id
				}).then(function(res) {
					{
						let result = res.data;
						console.log(result)
						for (let i = 0; i < result.length; i++) {
							// console.log(result[i])
							if (result[i].usefull === 1&&result[i].isDefault===1) {
								self.defaultPath = result[i]
								console.log(self.defaultPath)
							}
						}
					}
				})
			},
			//确认支付
			goPayment(){
				uni.navigateTo({
					url:'../payment/payment'
				})
			},
			//计算每个订单的总金额(被点击的那个)
			orderItemtotalCount(index){
				console.log(index)
				const i=this.goodsList[index]
				console.log(i)
				let total=0
				if(i.length>0){
					i.forEach(item=>{
						total+=item.pprice*item.number
					})
				}else if(i.length===0){
					return item.pprice*item.number
				}
				return total
			},
			//计算所有订单的总金额
			everyOrderTotal(){
				let len=this.goodsList.length
				for(let i=0;i<len;i++){
					this.totals.push(this.orderItemtotalCount(i))
				}
				console.log(this.totals)
			},
			// cntEveryOrder(result) {
			// 	 let self = this;
			//     if (Array.isArray(result)) {
			//         var promises = [];
			
			//         result.forEach(item => {
			//             var total = 0;
			
			//             item.forEach(i => {
			//                 var promise = isDiscountValid(i.discountsId)
			//                     .then(function (res) {
			//                         console.log(res.data);
			//                         if (res.data == 1) {
			//                             console.log('true');
			//                             total += i.discountMoney;
			//                             console.log('i.discountMoney:' + i.discountMoney);
			//                         }
			//                     });
			
			//                 promises.push(promise);
			//             });
			
			//             // 等待内部的所有异步操作完成
			//             Promise.all(promises).then(function () {
			//                 self.discount.push(total);
							
			// 				// 在这里调用 totalCountDiscount() 方法
			// 				self.totalCountDiscount();
			//             });
			//         });
			//     } else {
			//         isDiscountValid(result.discountsId)
			//             .then(function (res) {
			//                 console.log(res.data);
			//                 if (res.data == 1) {
			//                     console.log('true');
			//                     self.discount.push(result.discountMoney);
			//                 }
			//             })
			//             .then(function () {
			//                 console.log(self.discount);
							
			// 				// 在这里调用 totalCountDiscount() 方法
			// 				self.totalCountDiscount();
			//             });
			//     }
			// 	// console.log(self.discount);
			// },
			cntEveryOrder(result) {
			    let self = this;
			    if (Array.isArray(result)) {
			        var promises = [];
			        var totalCount = result.length;
			
			        result.forEach(item => {
			            var total = 0;
			            var itemCounter = item.length;
			
			            item.forEach(i => {
			                var promise = isDiscountValid(i.discountsId)
			                    .then(function (res) {
			                        console.log(res.data);
			                        if (res.data == 1) {
			                            console.log('true');
			                            total += i.discountMoney;
			                            console.log('i.discountMoney:' + i.discountMoney);
			                        }
			                    })
			                    .finally(function () {
			                        itemCounter--;
			                        if (itemCounter === 0) {
			                            // 所有item的异步操作都完成了，可以将total添加到self.discount中
			                            self.discount.push(total);
			                            totalCount--;
			                            if (totalCount === 0) {
			                                // 所有result的异步操作都完成了，可以调用totalCountDiscount()
			                                self.totalCountDiscount();
			                            }
			                        }
			                    });
			
			                promises.push(promise);
			            });
			        });
			    } else {
			        isDiscountValid(result.discountsId)
			            .then(function (res) {
			                console.log(res.data);
			                if (res.data == 1) {
			                    console.log('true');
			                    self.discount.push(result.discountMoney);
			                }
			            })
			            .finally(function () {
			                // 在这里调用 totalCountDiscount() 方法
			                self.totalCountDiscount();
			            });
			    }
			},
			totalCountDiscount(){
				console.log('初始值: ' + this.totalCount.pprice)
				let tt=this.totalCount.pprice
				this.discount.forEach(d=>{
					this.totalCount.pprice-=d
					console.log('每次：'+d)
				})
				console.log('this.totalCount.pprice最终值:'+this.totalCount.pprice)
				return this.totalCount.pprice
			},
			
		},
		computed:{
			...mapState({
				list:state=>state.cart.list
			}),
			...mapGetters(['totalCount']),
			//根据商品列表找到对应e.detail 数据的 id  
			//最终返回商品数据
			goodsList(){
				console.log(this.list)
				let arr={}
				arr= this.item.map(id=>{
					return this.list.find(v=>v.id == id);
				})
				console.log(arr)
				
				const shopIdMap = new Map();
				// 遍历原始数组
				arr.forEach(item => {
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
				this.cntEveryOrder(result);
				console.log(result)//goodsList内容	
				return result
			},
			
		},
		
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}
		.tag {
			font-size: 24upx;
			color: $base-color;
			margin:0 30upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 50upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
					color: red;
				}
				.number{
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}
	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
	
	/* 支付列表 */
	.pay-list{
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;
		.pay-item{
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;	
			position: relative;
		}
		.icon-weixinzhifu{
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}
		.icon-alipay{
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}
		.icon-xuanzhong2{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}
		.tit{
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}
	
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
		}
		.price-tip{
			color: $base-color;
			margin-left: 8upx;
		}
		.price{
			font-size: 36upx;
			color: $base-color;
		}
		.submit{
			display:flex;
			align-items:center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}
	
	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}

</style>
