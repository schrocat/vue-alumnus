import thirdHttp from './thirdHttp'

export async function getLoginStatus () {
  const res = await thirdHttp.get('/loginStatus')
  return res.data
}
export async function getUserInfo () {
  const rsp = await thirdHttp.get('/getUserInfo')
  return rsp.data
}
