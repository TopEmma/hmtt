import request from '@/utils/request'
// 只有vue组件文件中才能用this.$store在js中没有这个this，所以只能
import store from '@/store'
/*
*获取短信验证码
*@param {number} mobile
*returns promise
 *
*/
// export const getSmsCode = (mobile) => {
//   return request({
//     rul: `/sms/codes/${mobile}`
//   })
// }

// export const getSmsCode = (mobile) => {
//   return request({
//     url: `/sms/codes/${mobile}`
//   })
// }
export const getSmsCode = () => {
  return request({
    url: ''
  })
}
/*
*登录
*@param {mobile,code} param0
*@return promise
*/
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
