const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // 允许跨域请求

// 路由用于代理腾讯地图路线规划API请求
app.get('/planRoute', async (req, res) => {
  try {
    const apiKey = 'F2XBZ-SCM3G-W53Q3-QVSOB-NUXBO-TDBUI';
    const apiUrl = `https://apis.map.qq.com/ws/direction/v1/driving?output=json&key=${apiKey}&from=${req.query.from}&to=${req.query.to}`; // 替换成腾讯地图API的实际请求地址

    const response = await axios.get(apiUrl);
	console.log(apiUrl)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
