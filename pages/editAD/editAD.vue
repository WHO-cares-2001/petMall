<template>
	<view>
		<view>
			<uni-nav-bar left-icon="left" right-icon="trash" title="编辑收货地址" @clickLeft="goBack()"
				@clickRight="dialogToggle('warn')" />
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
					<switch :checked="FormData.isDefault" @change="switch1Change" color="#FE4355"
						style="transform:scale(0.7)" />
				</uni-forms-item>
			</uni-forms>

			<button class="saveButton" @click="submit('addressForm')">保存</button>
		</view>

		<!-- 不可以删 -->
		<view @tap="showCityPicker()"></view>
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onChange="onChange"
			@onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="警告" content="是否确认删除？"
					@confirm="dialogConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>

	</view>
</template>

<script>
	import {
		update,
		deleteByIds
	} from "../../network/modules/address.js";
	import mpvueCityPicker from '../../components/uni/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		data() {
			return {
				pickerValueDefault: [0, 0, 1],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',
				FormData: {
					id: '',
					addressName: '',
					tel: '',
					province: '',
					adress: '',
					usefull: 1,
					isDefault: false,
				},
				addressRules: {
					name: {
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
								}else{
									callback();
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
					address: {
						rules: [{
							required: true,
							errorMessage: '详细地址不能为空'
						}]
					},
					flag:'',
					
				}
			}
		},
		onLoad(e) {
			let result = JSON.parse(e.data);
			console.log(result)
			this.flag=result.flag
			// console.log(this.flag)
			
			let tep = result.item;
			let def = tep.isDefault;
			delete tep.isDefault;
			let isDefault = false;
			if (def) {
				isDefault = true;
			}
			this.FormData = tep;
			this.FormData.isDefault = isDefault;
			console.log(this.FormData);
		},
		methods: {
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				let self = this;
				deleteByIds({
					id: self.FormData.id
				}).then(function(res) {
					uni.showToast({
						title: `删除成功`
					});
					setTimeout(() => {
						uni.navigateTo({
							url: "../myAD/myAD"
						})
					}, 700);
				})
			},
			switch1Change: function(e) {
				
				this.FormData.isDefault = e.detail.value
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

			},
			onCancel(e) {

			},
			onConfirm(e) {
				this.FormData.province = e.label;
			},
			submit(ref) {
				let self = this;
				let def = self.FormData.isDefault;
				delete self.FormData.isDefault;
				let isDefault = 0;
				if (def) {
					isDefault = 1;
				}
				this.$refs[ref].validate().then(res => {
					//判断是否已经有默认地址了
					if(this.flag&&isDefault===1){
						//取消已有的默认
						let data={
							"id":this.flag,
							"isDefault":0
						}
						console.log(data)
						
						update(data)
						.then(function(res) {
							console.log(res)
							
						})
					}else if(this.flag===null){
						//没有
						
					}
					
					//console.log(...this.FormData)
					update({
						...this.FormData,
						isDefault: isDefault
					}).then(function(res) {
						uni.showToast({
							title: `修改成功`
						});
						setTimeout(() => {
							uni.navigateTo({
								url: "../myAD/myAD"
							})
						}, 700);
					})


				}).catch(err => {
					console.log('err', err);
				})
			},

			deleteAd() {
				let self = this;
				deleteByIds({
					id: self.FormData.id
				}).then(function(res) {
					uni.showToast({
						title: `修改成功`
					});
					setTimeout(() => {
						uni.navigateTo({
							url: "../myAD/myAD"
						})
					}, 700);
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