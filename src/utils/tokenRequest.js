import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
// import store from '@/store'
import router from '@/router/index'
import md5 from 'md5'

// create an axios instance
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

service.interceptors.response.use(
  response => {
    const res = response
    if (res.data.status_code !== 200) {
      MessageBox.confirm('未检测到登陆信息或者您已被登出，点击取消可以继续留在该页面，或者重新登录',
          '确定登出？', {
            confirmButtonText: '重新登陆',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          router.push({
            name: "login"
          })
        })
        .catch(() => {
          return null
        })
    } else {
      return res
    }
  }
)



let getSignature = (v, p, t, u, r) => {
  //V{web端程序版本号}|P{密钥}|T{当前时间戳}U{唯一识别码}|R{Base64的未加密的请求数据}
      let obj = r;
      let objStr = "";

      objStr = r?Base64.encode(JSON.stringify(obj)): null;

      let str = `v${v}|P${p}|T${t}|U${u}|R${objStr}`;

      let signature = md5(str).toUpperCase();
      console.log(signature)
      return signature;
}

const tokenRequest = function (url, data) {
  //V{web端程序版本号}|P{密钥}|T{当前时间戳}U{唯一识别码}|R{Base64的未加密的请求数据}
  //密钥：10c17ad2f31132a1
  const encryptKey = '10c17ad2f31132a1';
  const udid = '60.186.186.233'; //客户端ip
  let time = new Date().getTime();
  let version = "1.0.0"
  return service({
    url: url,
    method: 'GET',
    params: data,
    headers: {
      'UDID': `${udid}`,
      'TIME': time,
      'SYSAUTH': `${getSignature(version,encryptKey,time,udid,data)}`,
      "AccessToken": window.sessionStorage.access_token ? window.sessionStorage.access_token : 0,
      'UID': window.sessionStorage.id ? window.sessionStorage.id : 0,
      'Content-Type': 'application/json;charset=UTF-8',
      'Version': `${version}`
    }
  })
}
export default tokenRequest
