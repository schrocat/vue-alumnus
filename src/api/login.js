import thirdHttp from './thirdHttp'
// 获取登录状态
export async function getLoginStatus () {
  const res = await thirdHttp.get('/loginStatus')
  return res.data
}
// 获取用户个人信息
export async function getUserInfo () {
  const rsp = await thirdHttp.get('/getUserInfo')
  return rsp.data
}
// 插入帖子
export async function insertPosts (params) {
  const rsp = await thirdHttp.post('/posts', params)
  return rsp.data
}
// 更新用户信息
export async function updateUserInfo (params) {
  const rsp = await thirdHttp.post('/updateUserInfo', params)
  return rsp.data
}
// 获取帖子
// export async function getPosts (pageIndex, pageSize, type = 4) {
//   const url = `/posts?pageIndex=${pageIndex}&pageSize=${pageSize}&type=${type}`
//   const rsp = await thirdHttp.get(url)
//   return rsp.data
// }
// 审核帖子
export async function setPostChecked (params) {
  const url = '/setPostChecked'
  const rsp = await thirdHttp.post(url, params)
  return rsp.data
}
export async function updatePost (id, params) {
  const url = '/posts/' + id
  const rsp = await thirdHttp.put(url, params)
  return rsp
}
export async function getAllMajors () {
  const url = '/getAllMajors'
  const rsp = await thirdHttp.get(url)
  return rsp.data
}
