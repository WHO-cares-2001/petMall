<template>
	<view>
		<view class="register">
			<uni-nav-bar left-icon="left" title="注 册" backgroundColor="transparent" color="white"
				@clickLeft="goBack()" />
			<view class="register-box">
				<view class="registerName">注 册</view>
				<uni-forms ref="registerForm" :rules="registerRules" :modelValue="registerFoemData">
					<uni-forms-item name="username">
						<uni-easyinput class="register-input" prefixIcon="person" v-model="registerFoemData.username"
							placeholder="用户名">
						</uni-easyinput>
					</uni-forms-item>

					<uni-forms-item name="tel">
						<uni-easyinput class="register-input" prefixIcon="phone" v-model="registerFoemData.tel"
							placeholder="手机号"></uni-easyinput>
					</uni-forms-item>

					<uni-forms-item name="password">
						<uni-easyinput class="register-input" type="password" prefixIcon="locked"
							v-model="registerFoemData.password" placeholder="密码(长度6~20)"></uni-easyinput>
					</uni-forms-item>

					<uni-forms-item name="password2">
						<uni-easyinput class="register-input" type="password" prefixIcon="locked"
							v-model="registerFoemData.password2" placeholder="确认密码"></uni-easyinput>
					</uni-forms-item>
				</uni-forms>
				<button class="registerButton" @click="submit('registerForm')">注册</button>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		save
	} from "../../network/modules/user.js";
	export default {
		data() {
			return {
				registerFoemData: {
					username: '',
					tel: '',
					password: '',
					password2: '',
				},
				registerRules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '用户名不能为空',
						}]
					},
					tel: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空'
						}, {
							validateFunction: function(rule, value, data, callback) {
								let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
								if (!reg.test(value)) {
									callback('请输入正确的11位手机号')
									return false;
								}
							}
						}, ]
					},
					password: {
						rules: [{
								required: true,
								errorMessage: '密码不能为空'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
									if (!reg.test(value)) {
										callback('请输入(6-16位)数字和字母组成')
										return false;
									}
								}
							}
						]
					},

					password2: {
						rules: [{
								required: true,
								errorMessage: '请再次输入密码'
							},
							{
								validateFunction: (rule, value, data, callback) => {
									if (value != this.registerFoemData.password) {
										callback('请输入两次相同密码')
									}
									return true

								},
								message: '两次密码校验不一致',
								trigger: ["change", "blur"]

							},
						]
					},

				}
			}
		},
		methods: {
			goBack() {
				//uni.navigateBack()//默认delta:1
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					save({
						"username": this.registerFoemData.username,
						"password": this.registerFoemData.password,
						"tel": this.registerFoemData.tel
					}).then(function(resp) {
						uni.showToast({
							title: `注册成功`
						});
						setTimeout(() => {
							uni.navigateTo({
								url: "../login/login"
							})
						}, 1000);
					}).catch(function() {
						uni.showToast({
							title: '此用户名/手机号已被占用',
							duration: 1000,
							icon: 'error'
						});
					});

				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style>
	.register {
		height: 100%;
		width: 100%;
		background-image: url(@/static/bg.jpg);
		background-size: 100% 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	,
	.register-box {
		color: #FFFFFF;
		width: 80%;
		margin: auto;
		margin-top: 30%;
	}

	.register-input {
		background-color: transparent;
	}

	.registerButton {
		background-color: #FE4355;
		border-radius: 50rpx;
		color: white;
	}

	.registerName {
		text-align: center;
		font-size: larger;
		font-weight: 500;
		margin: auto;
		margin-bottom: 40rpx;
	}
</style>