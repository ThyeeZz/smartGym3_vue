import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
// import store from '@/store'
import tokenRequest from './tokenRequest'
import md5 from 'md5'
import {jes,decrypt} from "@/tools"
import {
Base64
} from 'js-base64'

// create an axios instance
let service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (sessionStorage.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

let getSignature = (v, p, t, u, r) => {
  //V{web端程序版本号}|P{密钥}|T{当前时间戳}U{唯一识别码}|R{Base64的未加密的请求数据}
      let obj = r;
      let objStr = "";

      objStr = r?Base64.encode(JSON.stringify(obj)): null;

      let str = `V${v}|P${p}|T${t}U${u}|R${objStr}`;
      let signature = md5(str)
      return signature;
}

// response interceptor
service.interceptors.response.use(
  /**
   */
  response => {
    let res = response
    // 判断请求错误
    if (res.data.status_code !== 200) {
      if (res.data.status_code === 4000) {
        // to re-login
        tokenRequest('api/auth/token', {
          refresh_token: window.sessionStorage.refresh_token,
          id: window.sessionStorage.id
        }).then(res => {
          if (res.data.data) {
            let resualt = res.data.data;
            window.sessionStorage.setItem("access_token", resualt.access_token);
            window.sessionStorage.setItem("refresh_token", resualt.refresh_token);
          } else {
            MessageBox.confirm('您已被登出，可以继续留在该页面，或者重新登录',
                '确定登出？', {
                  confirmButtonText: '重新登陆',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                router.push({
                  name: "login"
                })
              })
              .catch((err) => {
                return 
              })
          }
        })
      } else if (res.data.status_code === 6011) {
        Message({
          message: '密码错误',
          type: 'error',
          duration: 3 * 1000
        })
      } else if (res.data.status_code === 6010) {
        Message({
          message: '用户名错误',
          type: 'error',
          duration: 3 * 1000
        })
      } else if (res.data.status_code === 4018) {
        Message({
          message: 'Cling 用户ID已经存在',
          type: 'error',
          duration: 3 * 1000
        })
      } else if (res.data.status_code === 500) {
        Message({
          message: '系统错误，请联系后台',
          type: 'error',
          duration: 3 * 1000
        })
      } else {
        Message({
          message: '请求有误，请联系后台',
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    // return Promise.reject(error)
  }
)

const httpRequest = function (method,url, data) {
  //V{web端程序版本号}|P{密钥}|T{当前时间戳}U{唯一识别码}|R{Base64的未加密的请求数据}
  //密钥：10c17ad2f31132a1
  const encryptKey = '10c17ad2f31132a1';
  const udid = '60.186.186.233'; //客户端ip
  let time = Math.ceil(new Date().getTime() / 1000);
  let version = "1.0.0";
  let requestBody = jes(data);
      //
  return service({
    url: url,
    method: method,
    data: {
      request_body: requestBody,
      signature: getSignature(version,encryptKey,time,udid,data),
      timestamp: time,
      udid: udid,
      version: version
    }
  })
}
export default httpRequest
