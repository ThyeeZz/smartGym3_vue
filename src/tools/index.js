import {
  Message
} from 'element-ui';
import { JSEncrypt } from 'encryptlong'
import Router from 'vue-router'

export const timeFormat = (timeStamp) => {
  let date = timeStamp ? new Date(timeStamp) : new Date();
  let year = date.getFullYear();
  let mounth = date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${year}年${mounth}月${day}日 ${hour}:${minute}:${second}`
}

export const dateFormat = (timeStamp) => {
  let date = timeStamp ? new Date(timeStamp) : new Date();
  let year = date.getFullYear();
  let mounth = date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}年${mounth}月${day}日`
}

export const hmsFormat = (timeStamp) => {
  let date = timeStamp ? new Date(timeStamp) : new Date();
  let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${hour}:${minute}:${second}`
}

export const week = (timeStamp) => {
  let date = timeStamp ? new Date(timeStamp) : new Date();
  let week = date.getDay();
  switch (week) {
    case 1:
      return "周一";
    case 2:
      return "周二";
    case 3:
      return "周三";
    case 4:
      return "周四";
    case 5:
      return "周五";
    case 6:
      return "周六";
    case 7:
      return "周日";
    default:
      return null
  }
}
export const succeed = (message) => {
  Message({
    showClose: true,
    message: message,
    type: 'success',
    duration: 3000,
    center: true
  });
}
export const failed = (message) => {
  Message({
    showClose: true,
    message: message,
    type: 'error',
    duration: 3000,
    center: true
  });
}
export const warning = (message) => {
  Message({
    showClose: true,
    message: message,
    type: 'warning',
    duration: 3000,
    center: true
  });
}

export const jes = (data)=>{
  const pubKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDICsona1RUjVICiV84ArTcvX/J9pawmhFgICKy//k47+H3pekv3am6Mm9i3AjG1FsGQFpggVzgi5R66RJ0ps1x0P4jAhvsbdUp6hs9wbZ97LrAtNJBa9vUcWRLUsteSi44oF+G1yFhZg2gSvl0HJ3IYbLc6V/9/9cDx7H3yV7pfQIDAQAB`
  let encryptor = new JSEncrypt();
  let rsaDta;
  // 设置公钥
  encryptor.setPublicKey(pubKey);
  // 加密数据
  rsaDta = encryptor.encryptLong(JSON.stringify(data));
  return rsaDta;
} 
export const decrypt = (data)=>{
  const privateKey = `MIICWwIBAAKBgQCmtyj8YkQyyxeNHz59v37gM/daU71oJem8AaexGdVNNI17JexxdDQK7l52rS3GBhaXr/uvzHf49N6NvT1bc3kVLsFWd5DospsyfktiSdC6dpPXQRuzzAv4CYbg/nEPqvuHWZmgyhqY95es9reT/H8tszYFchiie5V7Pc62c9TCXQIDAQABAoGACZUnlvIzB1RjIypzlhjGuy5hfmCn12+ucq8Jq4VXnFtz8msonxDV2PcAmQO1SNeavtdPuTgggT/Z9v20pCgMApLoIdzjltRyjeGacJSbOqG+jSeou2OQRngg0In4iW3FpR8+PPu5kP8woZFX2E9V4vCiwZ91lYNo5ngGvuwmcUUCQQDZwiO4KR7IMSqnCU9lx0qcCXZ35A5RX+g4rGqXd2/qiM3koGFcZH25fHBh7hDFNwt65UICjKkk+DZRPgQ3zVh7AkEAw/5DMTSRKvLge2yadwtS1lCNWj+piV+9913ZXVHgBQNqXFkfN/yZL7l18KOdgO9/OESmMunlBOZmovOUVvvVBwJAQia0/SwYus4c2/N7GDsrki1ZvOAd7WCKRjUyiGLzL7dxfMOv8AZjHycLaOSOWar4JNRici3S8HUq4xFI7L7H4wJAXQKD5oz4uzYJe+kdIJNaG2ScwBBoJ04tO3/pEFUzh42IYwzUOOCB3dkYdDthGngNmqlRaeX/jiS83mXTprfZ7wJABwXeenYjQv/KKM1YFfzgZZtZpXGHhZzfI8sFmJjnvby56w+VXHOgaV0ipJVJGv5vuzdGm3l4eve9PoerSxV2mg==`
  let encryptor = new JSEncrypt();
  let rsaDta;
  // 设置公钥
  encryptor.setPrivateKey(privateKey);
  // 解密数据
  rsaDta = encryptor.decryptLong(data);
  return rsaDta
} 
