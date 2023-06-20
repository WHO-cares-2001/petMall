<template>
	<view class="index">
		<view class="box-bg">
			<uni-nav-bar left-icon="left" title="我的收货地址" @clickLeft="goBack()" />
		</view>

		<view class="add-path">
			<uni-list class="myAddress-box">
				<uni-list-item :title="item.addressName +' '+item.tel" :note="item.province+item.adress"
					thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="lg" clickable
					@tap="updateAdd(index)" v-for="(item,index) in addressListData" :key="index">
					<template v-slot:footer>

						<uni-tag text="默认" type="error" v-if="item.isDefault" class="tag-isDefault" />
						<text class="address-text">点击编辑</text>
					</template>

				</uni-list-item>

			</uni-list>
		</view>
		<view class="add-button" @tap="addAdd()">
			+ 添加收货地址
		</view>


	</view>
</template>

<script>
	import {
		addressList
	} from "../../network/modules/address.js";
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				addressListData: [],
			}
		},
		computed: {
			...mapState({
				list: state => state.path.list,
			}),
		},
		onLoad() {
			let self = this;
			let Id = window.localStorage.getItem("userId");
			console.log(Id)
			
			addressList({
				userId: Id
			}).then(function(res) {
				{
					let result = res.data;
					console.log(res.data);
					for (let i = 0; i < result.length; i++) {

						if (result[i].usefull == 0) {
							result.splice(i, 1);
							i--;
						}
					}
					self.$store.commit('setAddressList', result);
					self.addressListData = result;
					// state.path.addressList=res.data
				}
			})

		},

		methods: {
			goBack() {
				//uni.navigateBack()//默认delta:1
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			updateAdd(index) {
				let addressObj = JSON.stringify({
					index: index,
					item: this.addressListData[index]
				})
				uni.navigateTo({
					url: "../editAD/editAD?data=" + addressObj
				})
			},
			addAdd() {
				uni.navigateTo({
					url: "../addAD/addAD"
				})
			},

		}
	}
</script>

<style scoped>
	.box-bg {
		background-color: #FEFEFE;
	}

	.add-path {
		background-color: white;
		margin-left: 4rpx;
		margin-right: 4rpx;
		display: flex;
		justify-content: center;
	}

	,
	.add-button {
		width: 100%;
		display: flex;
		justify-content: center;

		position: fixed;
		bottom: 12rpx;

		border: 2rpx solid;
		background-color: #FE4355;
		color: white;
		border-radius: 30rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
	}

	.myAddress-box {
		width: 95%;
		margin: auto;
	}

	.address-text {
		font-size: 14rpx;
		color: #999;
	}

	.tag-isDefault {
		height: 20rpx;
	}
</style>