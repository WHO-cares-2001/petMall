// 共享方法示例

//去商品详情页
//type值为0是宠物，值为1是周边
export function goDetail(id,type,shopId) {
  uni.navigateTo({
    url: '../goodsDetail/goodsDetail?id='+id+'&type='+type+'&shopId='+shopId
  });
  console.log(id);
}

//去主页
export function goIndex() {
	// console.log('goIndex')
	uni.switchTab({
		url: '../index/index' // 替换为目标页面的路径
	});
  
}

//去我的页面
export function goMy() {
	// console.log('goMy')
	uni.switchTab({
		url: '../my/my' // 替换为目标页面的路径
	});
  
}

//去全部订单页
export function goOrderStates(num) {
  uni.navigateTo({
    url: '../orderStates/orderStates?num='+num
  });
  // console.log('go orderStates');
}

//返回
export function goBack() {
	uni.navigateBack({
	  delta: 1, // 返回的页面数，1表示返回上一个页面
	  success: function () {
	    console.log('返回上一个页面成功');
	  }
	});
}