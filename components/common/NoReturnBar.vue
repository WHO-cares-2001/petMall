<template>
	<!-- 不能返回某个界面 -->
	<uni-nav-bar
	class="bar"
	:title="barTitle" 
	:border="false"
	/>
</template>

<script>
export default{
		props:{
			barTitle:String
		}
	}	
</script>

<style>
</style>