import axios from "axios"
import qs from "qs"


let instance = axios.create({
    baseURL:'http://localhost:8899/demo'
});

instance.interceptors.response.use(
    response => {
        let result = response.data;
        if (result.statusCode == 200) {
            console.log(response);
            return response.data;
        }
        else if(result.statusCode==500)
        {
            console.log({ message: "先登录" })
        }
        else {
            console.log({ message: "请求错误，服务器返回：" + response.data.message })
            return Promise.reject(response.data.message);
        }
    }, err => {
        console.log({ message: "发生错误！" + err })
        return Promise.reject(err);
    }
)

instance.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        Dialog({ message: '请求超时' })
        return Promise.reject(err)
    }
)

export function get(url,params){
    var token = window.localStorage.getItem("token");
    return instance({
        method:'get',
        url:`${url}`,
        params:params,
        headers: {
            'token': token
        }
    })
}

export function post(url,params){
    var token = window.localStorage.getItem("token");
    return instance({
        method:'post',
        url:`${url}`,
        params:params,
        transformRequest:[function(data){
            return qs.stringify(data,{allowDots:true})
        }],
        headers: {
            'token': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export function postJson(url,params){
    var token = window.localStorage.getItem("token");
      return instance({
          method: 'post',
          url: `${url}`,
          data: params,
          headers: {
            'token': token,
            'Content-Type': 'application/json',
          }
        })
  }

