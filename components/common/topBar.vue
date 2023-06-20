<template>
	<!-- 顶上导航栏 -->
	<!-- 有返回箭头、点击返回返回某个界面，无边框 -->
	<uni-nav-bar
	class="bar"
	left-icon="left" 
	leftText="返回" 
	:title="barTitle" 
	:border="false"
	@clickLeft="handleClickLeft"
	/>
</template>

<script>
		
	export default{
		props:{
			barTitle:String
		},
		methods:{
			handleClickLeft(){
				this.$emit('click-left')
			}
		}
	}
</script>

<style >
/* .bar{
	position: sticky;
	top: 0;
	background-color: white;
} */

</style>