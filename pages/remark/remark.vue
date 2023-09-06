<template>
	<view>
		<view>
			<uni-nav-bar left-icon="left" title="评论" @clickLeft="goBack()" />
		</view>

		<uni-card padding="10rpx 0" v-for="(item,index) in remarkList" :key="index">
			<template v-slot:title>
				<uni-list>
					<uni-list-item :title="item.nikename" :thumb="'../../static/petImgs/'+item.img"
						thumb-size="lg" :rightText="item.createTime" />
				</uni-list>
			</template>
			<text class="uni-body uni-mt-5">{{item.content}}。</text>
		</uni-card>
		
		<view class="empty" v-if="remarkList.length===0">
			<text class="empty">评价还是空的，再去别的地方转转吧~</text>
		</view>
		
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
			// let id="1";
			let id=this.$route.query.stuffId
			console.log(id)
			
			stuffRemarks({stuffId:id})
			.then(function(res){
				self.remarkList=res.data;
				// for(let i=0;i<self.remarkList.length;i++)
				// {
				// 	self.remarkList[i].img='../../static/petImgs/'+self.remarkList[i].img;
				// }
				console.log(res.data)
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
.empty{
	/* position: absolute;
	left: 0;
	top: 100rpx; */
	margin: 100rpx 50rpx;
}
</style>