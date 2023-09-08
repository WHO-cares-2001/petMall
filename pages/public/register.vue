<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎注册！
			</view>
			<view class="input-content">
				<uni-forms ref="registerForm" :rules="registerRules" :modelValue="registerFoemData">
					<!-- <view class="input-item">
						<text class="tit">用户名</text>
						<input type="text" :value="registerFoemData.username" placeholder="请输入用户名" maxlength="11"
							data-key="mobile" @input="inputChange" />
					</view>
					<view class="input-item">
						<text class="tit">密码</text>
						<input type="mobile" :value="registerFoemData.password" placeholder="请输入密码"
							placeholder-class="input-empty" maxlength="20" password data-key="password"
							@input="inputChange" @confirm="toLogin" />
					</view> -->
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
			</view>

			<button class="confirm-btn" @click="submit('registerForm')">注册</button>
			<view class="forget-section" @click="toLogin()">
				—返回登录—
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
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

				logining: false,
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
		onLoad() {

		},
		methods: {
			...mapMutations(['login']),
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegist() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			async toLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
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
								url: "/pages/public/login"
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
		},

	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	/* .input-content {
		.uni-forms-item{
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			padding: 0 30upx;
			background: $page-color-light;
			height: 120upx;
			border-radius: 4px;
			margin-bottom: 50upx;
			
			&:last-child {
				margin-bottom: 0;
			}
		}
		.uni-easyinput {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	} */

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>