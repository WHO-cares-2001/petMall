<template>
	<view class="">
		<!-- 顶部导航栏 -->
		<TopBar barTitle="评价页" @click-left='goBack()'></TopBar>
		
		<view class="page">
			<view class="evaluate-goods">
				<view class="list">
					<view class="picture">
						<image src="../../static/petImgs/img/9.jpg"></image>
					</view>
					<view class="item">
						<view class="title">
							<text>商品评价</text>
						</view>
						<view class="star-list">
							<uni-rate v-model="rateValue" @change="onChange" />
							<view class="hint">
								<text>{{remarkStar[rateValue]}}</text>
							</view>
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
					<textarea placeholder="感觉怎么？跟大家分享一下吧~" @input="sumfontnum"></textarea>
					<view class="record-text">
						<text>已写</text>
						<text class="ac">{{fontNum}}</text>
						<text>个字</text>
					</view>
				</view>
				<!-- <xg-picker-media @confirm="onMediaConfirm"></xg-picker-media> -->
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
	
	export default {
		components:{
			TopBar
		},
		data() {
			return {
				isChecked: false,
				rateValue: 0,
				fontNum:0,
				remarkStar: ['', '很不满意', '不满意', '一般', '比较满意', '很满意']
			};
		},
		methods: {
			goBack(){
				goBack()
			},
			onChange(e) {
				// console.log('rate发生改变:' + JSON.stringify(e))
			},
			sumfontnum(e) {
				this.fontNum = e.detail.value.length
			},
			onMediaConfirm(e) {
				this.medias = e.detail.medias;
			},
			submit(){
				//
				console.log(this.rateValue)
				console.log(this.fontNum)
				if(this.fontNum==0){
					uni.showToast({
						title: `请填写评价！`,
						icon: 'error'
					})
				}
				if(this.rateValue==0){
					uni.showToast({
						title: `请选择满意度！`,
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "MyEvaluatePush.scss";
</style>