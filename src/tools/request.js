import service from "./http"
export const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    service({
      url,
      method,
      params: data
    }).then(res => {
      resolve(res),
        err => {
          reject(err)
        }
    }).catch(err => {
      reject(err)
    })
  })
}