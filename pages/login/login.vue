<!-- <template>
	<view class="login">
		<view class="login-box">
			<view class="loginName">登 录</view>
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
			<button class="loginButton" @click="submit('loginForm')">登录</button>
			<view class="login-line" @tap="toRegister()">-没有账号？点击注册-</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
	 
	import {
		login
	} from "../../network/modules/user.js";
	export default {
		data() {
			return {
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
		methods: {
			toRegister() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					let self=this
					
					login({
						...this.loginFormData
					})
					.then(function(resp){
						console.log(resp)
						let token=resp.data.data.token
						// self.setToken(token)
						self.$store.commit('setToken',token)
						console.log(token)
						
						let userId=resp.data.data.user.id
						// self.setUserId(token)
						self.$store.commit('setUserId',userId)
						console.log(userId)
					});
					uni.showToast({
						title: '登录成功',
						duration: 1000
					});
					setTimeout(() => {
						uni.switchTab({
							url: "../index/index"
						})
					}, 1000);
					
					

				}).catch(err => {
					console.log(ref);
					console.log('err', err);
				})
			},
			...mapMutations(['setUserId','setToken']),
			
		}
	}
</script>

<style>
	.login {
		height: 100%;
		width: 100%;
		background-image: url(@/static/bg.jpg);
		background-size: 100% 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	,
	.login-box {
		color: #FFFFFF;
		width: 80%;
		margin: auto;
		margin-top: 45%;
	}

	.login-input {
		/* margin-top: 30rpx; */
		background-color: transparent;
	}

	.loginButton {
		background-color: #FE4355;
		border-radius: 50rpx;
		color: white;
		margin-top: 40rpx;
	}

	.loginName {
		text-align: center;
		font-size: larger;
		font-weight: 500;
		margin: auto;
		margin-bottom: 40rpx;
	}

	.login-line {
		text-align: center;
		margin: auto;
		margin-top: 20rpx;
	}
</style> -->



<template>
	<view class="login">
		<view class="login-box">
			<view class="loginName">登 录</view>
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
			<button class="loginButton" @click="submit('loginForm')">登录</button>
			<view class="login-line" @tap="toRegister()">-没有账号？点击注册-</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'

	import {
		login
	} from "../../network/modules/user.js";
	export default {
		data() {
			return {
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
		methods: {
			toRegister() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					let self = this

					login({
							...this.loginFormData
						})
						.then(function(resp) {
							
							console.log(resp.data)
							let token=resp.data.token
							// self.setToken(token)
							self.$store.commit('setToken',token)
							console.log(token)
							
							let userId=resp.data.user.id
							// self.setUserId(token)
							self.$store.commit('setUserId',userId)
							console.log(userId)
						
							uni.showToast({
								title: '登录成功',
								duration: 1000
							});
							setTimeout(() => {
								uni.switchTab({
									url: "../index/index"
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
			...mapMutations(['setUserId', 'setToken']),

		}
	}
</script>

<style>
	.login {
		height: 100%;
		width: 100%;
		background-image: url(@/static/bg.jpg);
		background-size: 100% 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	,
	.login-box {
		color: #FFFFFF;
		width: 80%;
		margin: auto;
		margin-top: 45%;
	}

	.login-input {
		/* margin-top: 30rpx; */
		background-color: transparent;
	}

	.loginButton {
		background-color: #FE4355;
		border-radius: 50rpx;
		color: white;
		margin-top: 40rpx;
	}

	.loginName {
		text-align: center;
		font-size: larger;
		font-weight: 500;
		margin: auto;
		margin-bottom: 40rpx;
	}

	.login-line {
		text-align: center;
		margin: auto;
		margin-top: 20rpx;
	}
</style>