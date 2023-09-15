<template>
	<view class="total">
		<!-- 顶部导航栏 -->
		<TopBar barTitle="评价页" @click-left='goBack()'></TopBar>

		<view class="page">
			<view class="evaluate-goods" v-for="item in remarkList" :key="item.id">
				<view class="list">

					<view class="picture">
						<image :src="'../../static/petImgs/'+item.img"></image>
					</view>

					<view class="item">
						<view class="title">
							<text>{{item.nikename}}</text>
						</view>

						<view class="star-list">
							<uni-rate v-model="item.level" :readonly="true" />
							<view class="hint">
								<text>{{remarkStar[item.level]}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="input-info">
					<view class="input-title">
						<text>{{item.content}}</text>
					</view>
					<view class="record-text">
						<text>{{item.createTime}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		goBack
	} from '@/common/sharedMethods.js'
	import TopBar from '../../components/common/topBar.vue'
	import {
		stuffRemarks
	} from "../../network/modules/remark.js";
	export default {
		components: {
			TopBar
		},
		data() {
			return {
				isChecked: false,
				rateValue: 0,
				fontNum: 0,
				remarkStar: ['', '很不满意', '不满意', '一般', '比较满意', '很满意'],
				remarkList: [],
				linshi: {},
			}
		},
		onLoad() {
			let self = this;
			// 上个页面的参数
			// let id="1";
			let id = this.$route.query.stuffId
			stuffRemarks({
					stuffId: id
				})
				.then(function(res) {
					self.remarkList = res.data;
				})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1,
				})
			},


		}
	}
</script>

<style scoped lang="scss">
	page {
		background: $page-color-base;
	}
	.page {
		margin-top: 8px;
	}

	.evaluate-goods {
		padding: 0 30rpx;
		background-color: #ffffff;
		border-radius: 0 0 20rpx 20rpx;
		margin-bottom: 10rpx;
		border-radius: 20rpx;
		.list {
			display: flex;
			align-items: center;
			width: 100%;
			height: 160rpx;

			.picture {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}

			.item {
				height: 120rpx;

				.title {
					display: flex;
					align-items: center;
					height: 60rpx;
					color: #222222;
				}

				.star-list {
					display: flex;
					align-items: center;

					.star {
						display: flex;
						align-items: center;

						text {
							font-size: 38rpx;
							margin-right: 10rpx;
						}

						.ac {
							color: red;
						}
					}

					.hint {
						display: flex;
						align-items: center;
						margin-left: 40rpx;

						text {
							font-size: 26rpx;
							color: #222222;
						}
					}
				}
			}
		}
	}

	/*填写*/
	.input-info {
		padding: 0 30rpx;
		padding-bottom: 30rpx;
		background-color: #ffffff;

		.input-title {
			display: flex;
			align-items: center;
			width: 100%;
			height: 80rpx;

			text {
				font-size: 26rpx;
				color: #222222;
			}
		}

		.record-text {
			width: 100%;
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 100%;
			height: 40rpx;

			text {
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
</style>