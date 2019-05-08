import thirdHttp from './thirdHttp'

export async function getLoginStatus () {
  const res = await thirdHttp.get('/loginStatus')
  return res.data
}
export async function getUserInfo () {
  const rsp = await thirdHttp.get('/getUserInfo')
  return rsp.data
}
export async function insertPosts (params) {
  const rsp = await thirdHttp.post('/posts', params)
  return rsp.data
}
export async function updateUserInfo (params) {
  const rsp = await thirdHttp.post('/updateUserInfo', params)
  return rsp.data
}
