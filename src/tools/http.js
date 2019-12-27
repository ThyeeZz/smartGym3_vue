import axios from "axios"

const baseURL = "http://1.23.456:8080";

const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    //请求前逻辑：例如配置请求头 等等
    if (window.sessionStorage.access_token) {
      let ACCESS_TOKEN = window.sessionStorage.getItem("access_token");
      config.headers["X-Token"] = ACCESS_TOKEN
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    let res = response.data;
    if (res.status_code !== 200) {
      switch (res.status_code) {
        case 4001:
          //do something
          alert("未授权");
          //重新获取token...
          break;
        case 500:
          alert("服务器炸了");
          break;
        default:
          break;
      }
    }else{
        return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default service