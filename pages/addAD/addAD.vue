<template>
	<view>
		<view>
			<uni-nav-bar left-icon="left" title="新增收货地址" @clickLeft="goBack()" />
		</view>

		<view class="example">
			<!-- 自定义表单校验 -->
			<uni-forms ref="addressForm" :rules="addressRules" :modelValue="FormData">
				<uni-forms-item label="收件人" name="addressName">
					<uni-easyinput v-model="FormData.addressName" placeholder="名字" />
				</uni-forms-item>
				<uni-forms-item label="手机号" name="tel">
					<uni-easyinput v-model="FormData.tel" placeholder="手机号" />
				</uni-forms-item>
				<uni-forms-item label="所在地区" name="province" label-width="65">

					<view @tap="showCityPicker()">
						<uni-easyinput v-model="FormData.province" placeholder="省/市/区" />
						<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault"
							@onChange="onChange" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
					</view>

				</uni-forms-item>
				<uni-forms-item label="详细地址" name="adress" label-width="65">
					<uni-easyinput type="textarea" v-model="FormData.adress" placeholder="小区楼栋/乡村名字" />
				</uni-forms-item>

				<uni-forms-item label="是否设置为默认地址" name="isDefault" label-width="65">
					<switch @change="switch1Change" color="#FE4355" style="transform:scale(0.7)" />
				</uni-forms-item>
			</uni-forms>
			<button class="saveButton" @click="submit('addressForm')">保存</button>
		</view>

		<!-- 不可以删 -->
		<view @tap="showCityPicker()"></view>
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onChange="onChange"
			@onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>

	</view>
</template>

<script>
	import {
		saves
	} from "../../network/modules/address.js";
	import mpvueCityPicker from '../../components/uni/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		data() {
			return {
				pickerValueDefault: [0, 0, 1],
				FormData: {
					addressName: '',
					tel: '',
					province: '',
					adress: '',
					usefull: 1,
					isDefault: false,
				},
				addressRules: {
					addressName: {
						rules: [{
							required: true,
							errorMessage: '收件人不能为空',
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
					province: {
						rules: [{
							required: true,
							errorMessage: '地址不能为空'
						}]
					},
					adress: {
						rules: [{
							required: true,
							errorMessage: '详细地址不能为空'
						}]
					}
				}
			}
		},
		methods: {
			switch1Change: function(e) {
				this.FormData.isDefault=e.detail.value
			},
			goBack() {
				//uni.navigateBack()//默认delta:1
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onChange(e) {
				console.log(e);
			},
			onCancel(e) {
				console.log(e);
			},
			onConfirm(e) {
				this.FormData.province = e.label;
			},
			submit(ref) {
				let self = this;
				let def = self.FormData.isDefault;
				delete self.FormData.isDefault;
				let isDefault=0;
				if (def) {
					isDefault = 1;
				}
				let Id = window.localStorage.getItem("userId");
				this.$refs[ref].validate().then(res => {
					console.log({
						...this.FormData,
						isDefault: isDefault,
						userId: Id
					});
					
					
					saves({...this.FormData,isDefault: isDefault,userId:Id}).then(function(res){
						uni.showToast({
							title: `新增成功`
						});
						setTimeout(() => {
							uni.navigateTo({
								url: "../myAD/myAD"
							})
						}, 1000);
					}).catch(function(res){
						console.log('err', err);
					})

				}).catch(err => {
					console.log('err', err);
				})
			},

		},
		components: {
			mpvueCityPicker
		}
	}
</script>

<style lang="scss">
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.uni-forms-item {
		lable-wide: 100
	}

	.saveButton {
		background-color: #FE4355;
		border-radius: 50rpx;
		color: white;
	}
</style>