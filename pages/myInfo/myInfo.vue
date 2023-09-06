<template>
	<view>
		<view>
			<uni-nav-bar left-icon="left" title="个人信息" @clickLeft="goBack()" />
		</view>
		<uni-forms ref="userForm" :modelValue="userData" class="userForm-box" :rules="userFormRules">
			<view class="userImg">
				<image :src="'../../static/petImgs/'+userData.img" mode="aspectFit" style="width: 170rpx;margin-left: 35%"></image>
			</view>

			<uni-forms-item label="用户名">
				<uni-easyinput v-model="userData.username" disabled />
			</uni-forms-item>
			<uni-forms-item label="昵称" name="nikename">
				<uni-easyinput v-model="userData.nikename" placeholder="请输入昵称" />
			</uni-forms-item>
			<uni-forms-item label="性别" name="sex">
				<uni-data-checkbox v-model="userData.sex" :localdata="sexs" />
			</uni-forms-item>
			<uni-forms-item label="手机" name="tel">
				<uni-easyinput v-model="userData.tel" placeholder="请输入手机号" />
			</uni-forms-item>
		</uni-forms>
		<button class="saveButton" @click="submit('userForm')">保存</button>
	</view>
</template>

<script>
	import {
		userInfornation,
		update
	} from "../../network/modules/user.js";
	export default {
		data() {
			return {
				userData: {
					id: '',
					username: '',
					nikename: '',
					img: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
					sex: '',
					tel: '',
				},
				sexs: [{
					text: '男',
					value: '男'
				}, {
					text: '女',
					value: '女'
				}],
				userFormRules: {
					nikename: {
						rules: [{
							required: true,
							errorMessage: '昵称不能为空',
						}]
					},
					tel: {
						rules: [{
							required: true,
							errorMessage: '电话不能为空'
						}, {
							validateFunction: function(rule, value, data, callback) {
								let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
								if (!reg.test(value)) {
									callback('请输入正确的11位手机号')
									return false;
								}
							}

						}]
					},

				}
			}
		},
		onLoad() {
			let self = this;
			let id = window.localStorage.getItem("userId");
			userInfornation({
				id: id
			}).then(function(res) {
				self.userData = res.data;
				self.userData.img=self.userData.img;
				console.log(self.userData);
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1,
				})
			},
			submit(ref) {
				let self = this;
				this.$refs[ref].validate().then(res => {
					
					update(self.userData).then(function(res){
						console.log(res.data)
						uni.showToast({
							title: `修改成功`
						})
						setTimeout(() => {
							uni.switchTab({
								url: "../my/my"
							})
						}, 1000);
					})
					
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style lang="scss">
	.myInfo-box {
		width: 80%;
		margin: auto;
	}

	.slot-title-text {
		flex: 1;
		font-size: 25rpx;
		color: black;
		margin-right: 40rpx;
		font-weight: bold;
		width: 80rpx;
	}

	.saveButton {
		background-color: #FE4355;
		border-radius: 50rpx;
		color: white;
		width: 80%;
		margin: auto;
		margin-top: 50rpx;
	}

	.slot-text {
		flex: 1;
		font-size: 14rpx;
		color: black;
		margin-right: 10rpx;
	}

	.userForm-box {
		width: 80%;
		margin: auto;
	}
</style>