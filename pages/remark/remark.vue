<template>
	<view>
		<view>
			<uni-nav-bar left-icon="left" title="评论" @clickLeft="goBack()" />
		</view>

		<uni-card padding="10rpx 0" v-for="(item,index) in remarkList" :key="index">
			<template v-slot:title>
				<uni-list>
					<uni-list-item :title="item.nikename" :thumb="item.img"
						thumb-size="lg" :rightText="item.createTime" />
				</uni-list>
			</template>
			<text class="uni-body uni-mt-5">{{item.content}}。</text>
		</uni-card>
	</view>
</template>

<script>
	import {
		stuffRemarks
	} from "../../network/modules/remark.js";
	export default {
		data() {
			return {
				remarkList: [],
			}
		},
		onLoad() {
			let self = this;
			// 上个页面的参数
			let id="1";
			stuffRemarks({stuffId:id}).then(function(res){
				self.remarkList=res.data;
				for(let i=0;i<self.remarkList.length;i++)
				{
					self.remarkList[i].img='../../static/petImgs/'+self.remarkList[i].img;
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1,
				})
			},


		}
	}
</script>

<style>

</style>