<template>
	<view class="container">
		<TopBar barTitle="个人信息" @click-left='goBack()'></TopBar>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50" @click="showActionsheet()">
			<text class="cell-tit">头像</text>
			<img class="avatar" :src="'../../static/petImgs/'+userData.img" />
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">用户名</text>
			<text class="cell-tip">{{userData.username}}</text>
		</view>

		<view class="list-cell" @click="inputDialogToggle()" hover-class="cell-hover" :hover-stay-time="50">
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="修改昵称" :value="userData.nikename"
					placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
			<text class="cell-tit">昵称</text>
			<text class="cell-tip">{{userData.nikename}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>


		<picker :value="index" :range="array" @change="bindPickerChange">
			<view class="list-cell" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">性别</text>
				<text class="cell-tip">{{array[index]}}</text>
				<text class="cell-more yticon icon-you"></text>
			</view>
		</picker>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		update
	} from "../../network/modules/user.js";
	import {
		goBack
	} from '@/common/sharedMethods.js'
	import TopBar from '../../components/common/topBar.vue'
	export default {
		components: {
			TopBar
		},
		data() {
			return {
				hasLogin: false,
				array: ['未知', '男', '女'],
				index: 0,
				userData: {
					id: '',
					username: 'test',
					nikename: '我是测试',
					img: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
					sex: 0,
					tel: '',
				},
			};
		},
		onLoad() {
			let userInfoGet = uni.getStorageSync('userInfo');
			this.hasLogin = userInfoGet.hasLogin;
			this.userData = userInfoGet.user;
			this.index = this.userData.sex;
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1,
				})
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogClose() {
				console.log('点击关闭')
			},
			sumbitUpdate() {
				let self = this;
				let userInfoGet = uni.getStorageSync('userInfo');
				userInfoGet.user = this.userData;
				update({
					...self.userData
				}).then(function() {
					uni.setStorage({ //缓存用户登陆状态
						key: 'userInfo',
						data: userInfoGet
					});
				});
			},
			dialogInputConfirm(val) {
				this.userData.nikename = val
				this.$refs.inputDialog.close();
				this.sumbitUpdate();
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value;
				this.userData.sex = this.index;
				this.sumbitUpdate();
			},
			showActionsheet() {
				uni.showActionSheet({
					itemList: ['拍照', '从相册中选择'],
					success: (res) => {
						console.log('选择了第' + (res.tapIndex + 1) + '个选项');
					},
					fail: (err) => {
						console.log('弹窗取消');
					}
				});
			}

		},
		computed: {
			...mapState(['userInfo']),
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}

	img {
		padding-top: 5upx;
		width: 80upx;
		height: 80upx;
	}

	.user-section {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 460upx;
		padding: 40upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}

		.portrait-box {
			width: 200upx;
			height: 200upx;
			border: 6upx solid #fff;
			border-radius: 50%;
			position: relative;
			z-index: 2;
		}

		.portrait {
			position: relative;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}

		.yticon {
			position: absolute;
			line-height: 1;
			z-index: 5;
			font-size: 48upx;
			color: #fff;
			padding: 4upx 6upx;
			border-radius: 6upx;
			background: rgba(0, 0, 0, .4);
		}

		.pt-upload-btn {
			right: 0;
			bottom: 10upx;
		}

		.bg-upload-btn {
			right: 20upx;
			bottom: 16upx;
		}
	}

	page {
		background: $page-color-base;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
			// line-height: 40upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
</style>