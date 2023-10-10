宠物商城系统app前端

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/050979cb-0829-44b8-abbe-f35fae5ad84e)
![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/088ee2e2-c78d-4153-bb68-9e25dd0a6a25)

这是首页，首页商品根据商品点击量进行排序展示，库存不足的商品排在最后面，而且无法收藏、加购

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/a5ec4f1c-e423-4c1e-8a50-0fda2ac72708)
这是拥有二级分类的商品界面
![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/f5271cb2-fa35-4c01-8377-e263af7b59d5)
这是异宠分类下蛇分类下的所有蛇商品

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/8326b60f-2461-46c2-afab-3f38cfef6cad)
![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/ff7de7b6-d438-40a9-a8b5-d5b83924333a)
这是购物车界面，加入购物车的商品使用双层 v-for 按照商店展示（商品数据格式是嵌套数组的数组），一个商店对应多个加入购物车的商品。

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/04cec606-ed22-4787-9a41-46146ce59995)
点击购物车的结算后来到提交订单界面，提交订单界面会判断折扣是否在有效期，然后计算一个订单中的总折扣金额是多少，在最终支付的价格中减去总折扣金额。
这个用户没有默认地址，所以提交订单界面没有直接显示选中默认地址，需要用户选择一个地址下单，否则会提示。如果有默认地址，进入该界面时自动选中默认地址。
如下图所示：
![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/5656b406-29f7-4302-aa71-e924cfbdbfc9)

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/24a89ad7-aeab-44db-aff1-e5893ad2ff8b)
选中了非默认地址和填写了备注的样子

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/41d72d9f-4634-4363-94f2-1631cc55ab5b)
点击提交订单后的选择支付方式的界面

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/0eef7b69-ad1b-4aa8-8a86-e620ec3c70b7)
点击取消支付开始10分钟倒计时，时间到没有支付，订单状态变为自动取消，如下图所示：
![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/659ec8d9-d381-4e06-a191-4bacfdbaa9bf)

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/421fb6ec-e255-410a-8d65-27212a8242fe)
待发货订单
待支付和待发货订单可以选择取消订单，取消订单会分为超时取消和用户取消两种。

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/b18599ee-3a49-4f34-a591-d51dee6963b6)
已发货订单 

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/2ec1e8ad-de68-4271-af9f-e68023c9a290)
点击签收后订单状态变成待评价

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/527c2531-73fb-4f18-a788-a7cd57af0703)
点击去评价跳转评价页面

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/b8ea511c-f486-4401-bcee-3521259e75e2)
提交评价后变成已评价

可以点击查看评价按钮看该评价，如下图所示：
![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/2dfd8b60-a096-4323-9731-9446baf98409)

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/cd3a9e0b-9660-4d23-a3ec-ed6cf1696034)
用户界面

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/85783d95-57b2-4760-95b0-c1930414f44d)
点击地址管理可以对地址进行增删改查

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/bdaf57e3-60fe-487b-846d-6ab95e17c212)
点击我的收藏进入收藏界面

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/54aea536-3acb-42b1-a2f6-f50318fa6516)
![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/7bc643cf-9876-48ff-9053-febc7f958180)
首页搜索结果界面，按照周边和宠物展示搜索界面

![image](https://github.com/WHO-cares-2001/petMall/assets/77758923/838331f1-441d-4958-9e4d-af84ef0580f9)
所有周边商品
