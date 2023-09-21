<template>
	<view class="">
		<!-- 顶部导航栏 -->
		<TopBar barTitle="评价页" @click-left='goBack()'></TopBar>
		
		<view class="page">
			<!-- 每个评价 -->
			<view class=""  v-for="(item,index) in goods" :key="index">
				<view class="evaluate-goods">
					<view class="list">
						<view class="picture">
							<image :src="'../../static/petImgs/'+item.img"></image>
						</view>
						<view class="item">
							<view class="title">
								<text>{{item.name}}的商品评价</text>
							</view>
							<view class="star-list">
								<uni-rate v-model="item.rateValue" @change="onChange(item)" />
								<view class="hint">
									<text>{{remarkStar[item.rateValue]}}</text>
								</view>
								<!-- <view>{{item.rateValue==''}}</view> -->
							</view>
						</view>
					</view>
				</view>
				
				<!--填写-->
				<view class="input-info">
					<view class="input-title">
						<text>分享你的使用体验吧</text>
					</view>
					<view class="input-text">
						<textarea placeholder="感觉怎么样？跟大家分享一下吧~" 
						@input="sumfontnum(item,$event)"></textarea>
						<view class="record-text">
							<!-- <text>已写</text>
							<text class="ac">{{item.fontNum}}</text>
							<text>个字</text> -->
						</view>
					</view>
				</view>
			</view>
			
			<!--提交-->
			<view class="submit-btn">
				<view class="btn" @tap="submit">
					<text>提交</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {goBack} from '@/common/sharedMethods.js'
	import TopBar from '../../components/common/topBar.vue'
	import {
		addComment
	}from '../../network/modules/comment.js'
	
	export default {
		components:{
			TopBar
		},
		data() {
			return {
				isChecked: false,
				// rateValue: 0,
				// fontNum:0,
				remarkStar: ['很不满意', '不满意', '一般', '比较满意', '很满意'],
				goods:[],
			};
		},
		onLoad(e) {
			this.goods=JSON.parse(e.json)
			console.log(this.goods)
			 
		},
		mounted(){
			// 在这里初始化rateValue和fontNum属性
			 this.goods.forEach(item => {
				item.rateValue = 0; // 初始化rateValue为0
				item.fontNum = '';   // 初始化fontNum为0
				console.log(item)
			 });
		},
		methods: {
			goBack(){
				goBack()
			},
			onChange(item) {
				// console.log('rate发生改变:' + JSON.stringify(e))
				console.log('rate发生改变:' + item.rateValue)
				this.$set(item, 'rateValue', item.rateValue); 
			},
			// sumfontnum(e) {
			// 	this.fontNum = e.detail.value.length
			// },
			sumfontnum(item, event) {
				
			  item.fontNum = event.detail.value;
			  console.log('文字内容：'+event.detail.value)
			  // this.$set(item, 'fontNum', event.detail.value.length);
			  console.log('统计:'+item.fontNum )
			},
			onMediaConfirm(e) {
				this.medias = e.detail.medias;
			},
			submit(){
				//查每个是不是有没填的
				var flag=false
				this.goods.forEach(item => {
					let rateValue= item.rateValue 
					let fontNum=item.fontNum 
					console.log('rateValue'+rateValue)
					console.log('fontNum'+fontNum)
					if(fontNum.length==0){
						uni.showToast({
							title: `请填写评价！`,
							icon: 'error'
						})
						flag=true
					}
					if(rateValue==0){
						uni.showToast({
							title: `请选择满意度！`,
							icon: 'error'
						})
						flag=true
					}
				});
				if(!flag){
					//没有没填的，可以交到后端
					this.goods.forEach(item=>{
						var com={
							content:item.fontNum,
							level:item.rateValue,
							orderdetailsId:item.ids
						}
						console.log(com)
						addComment(com)
						.then(function(res){
							console.log(res)
							
							//等待异步操作做完，再跳转相应订单界面
							//添加完了提示
							uni.showToast({
								title:'评论已提交！',
								icon:'success'
							})
							//跳转别的页面
							uni.navigateTo({
								url:'../orderStates/orderStates?state=4'
							})
						})
					})
					
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "MyEvaluatePush.scss";
</style>