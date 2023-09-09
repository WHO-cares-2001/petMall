<template>
	<view class="content">
		<!-- 顶部导航栏 -->
		<TopBar barTitle="编辑收货地址" @click-left='goBack()'></TopBar>
		
		<span class="btn-delete">12321</span>
		<view class="row b-b">
			<text class="tit">收件人</text>
			<input class="input" type="text" v-model="addressData.addressName" placeholder="收货人姓名"
				placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.tel" placeholder="收货人手机号码"
				placeholder-class="placeholder" />
		</view>

		<view class="row b-b" @tap="showCityPicker()">
			<text class="tit">所在地区</text>
			<input class="input" type="text" v-model="addressData.province" placeholder="省/市/区"
				placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.adress" placeholder="楼号、门牌"
				placeholder-class="placeholder" />
		</view>

		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.default" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
		<view class="register-section" v-show="flag">
			<text @click="dialogToggle('warn')">删除此地址</text>
		</view>

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
	import {goBack} from '@/common/sharedMethods.js'
	import TopBar from '../../components/common/topBar.vue'
	
	import {
		update,
		deleteByIds,
		saves
	} from "../../network/modules/address.js";
	import mpvueCityPicker from '../../components/uni/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		components:{
			TopBar,
			mpvueCityPicker
		},
		data() {
			return {
				flag: false,
				pickerValueDefault: [0, 0, 1],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				addressData: {
					id: '',
					addressName: '',
					tel: '',
					province: '',
					adress: '',
					usefull: 1,
					isDefault: 0,
					default: false,
				}
			}
		},
		onLoad(option) {
			let title = '新增收货地址';
			if (option.type === 'edit') {
				title = '编辑收货地址'
				this.flag = true;

				let date = JSON.parse(option.data);
				this.addressData = date;
				if (date.isDefault) {
					this.addressData.default = true;
				}else{
					this.addressData.default = false;
				}
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			goBack(){
				goBack()
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				let self = this;
				deleteByIds({
					id: self.addressData.id
				}).then(function(res) {
					uni.showToast({
						title: `删除成功`
					});
					self.$api.prePage().refreshList();
					setTimeout(() => {
						uni.navigateBack()
					}, 800)
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
				this.addressData.province = e.label;
			},

			switchChange(e) {
				this.addressData.default = e.detail.value;
				if (this.addressData.default) {
					this.addressData.isDefault = 1;
				} else {
					this.addressData.isDefault = 0;
				}
			},

			//地图选择地址
			chooseLocation() {
				uni.chooseLocation({
					success: (data) => {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},

			//提交
			confirm() {
				let data = this.addressData;
				if (!data.addressName) {
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.tel)) {
					this.$api.msg('请输入正确的11位手机号码');
					return;
				}
				if (!data.province) {
					this.$api.msg('请选择地区');
					return;
				}
				if (!data.adress) {
					this.$api.msg('请填写详细地址');
					return;
				}

				let self = this;
				let Id = window.localStorage.getItem("userId");
				delete this.addressData.default;
				if (this.manageType == 'edit') {
					update({
						...this.addressData
					}).then(function(res) {
						uni.showToast({
							title: `修改成功`
						});
						self.$api.msg(`地址${self.manageType=='edit' ? '修改': '添加'}成功`);
						self.$api.prePage().refreshList(data, self.manageType);
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					})
				} else {
					saves({
						...this.addressData,
						userId: Id
					}).then(function(res) {
						uni.showToast({
							title: `新增成功`
						});
						self.$api.msg(`地址${self.manageType=='edit' ? '修改': '添加'}成功`);
						self.$api.prePage().refreshList(data, self.manageType);
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					}).catch(function(err) {
						console.log('err', err);
					})
				}
			},

		},
		
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.register-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 140upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.btn-delete {
		position: absolute;
		right: 10px;
		top: 20px;
	}
</style>