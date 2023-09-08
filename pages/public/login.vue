<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<uni-forms ref="loginForm" :rules="loginRules" :modelValue="loginFormData">
					<uni-forms-item name="username">
						<uni-easyinput class="login-input" prefixIcon="person" v-model="loginFormData.username"
							placeholder="用户">
						</uni-easyinput>
					</uni-forms-item>

					<uni-forms-item name="password">
						<uni-easyinput class="login-input" type="password" prefixIcon="locked"
							v-model="loginFormData.password" name="password" placeholder="密码"></uni-easyinput>
					</uni-forms-item>
				</uni-forms>
			</view>
			<button class="confirm-btn" @click="submit('loginForm')">登录</button>
			<view class="register-section">
				<text @click="toRegist">还没有账号?马上注册</text>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations,
	} from 'vuex';
	import {
		login
	} from "../../network/modules/user.js";
	export default {
		data() {
			return {
				logining: false,
				loginFormData: {
					username: '',
					password: '',
				},
				loginRules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '用户名不能为空',
						}]
					},

					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
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
					url: '/pages/public/register'
				})
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					let self = this
					login({
							...this.loginFormData
						})
						.then(function(resp) {
							console.log(resp);
							let token = resp.data.token;
							let user = resp.data.user;
							
							delete user.password;
							
							let sendData={token:token,user:user};
							self.$store.commit('setUserInfo', sendData);
							uni.showToast({
								title: '登录成功',
								duration: 1000
							});
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}, 1000);
						}).catch(function(resp) {
							uni.showToast({
								title: '用户名/密码错误',
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

	.register-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.forget-section {
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