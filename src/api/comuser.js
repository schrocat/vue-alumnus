import http from './http'
const URL = '/comusers'
export async function getComusers (offset = 0, pageSize = 1000) {
  const surl = `${URL}?offset=${offset}&pageSize=${pageSize}`
  const rsp = await http.get(surl)
  return rsp.data
}
export async function insertComuser (params) {
  const rsp = await http.post(URL, params)
  return rsp.data
}
export async function updateComuser (id, params) {
  const surl = URL + '/' + id
  const rsp = await http.put(surl, params)
  return rsp.data
}
export async function deleteComuser (id) {
  const surl = URL + '/' + id
  const rsp = await http.delete(surl)
  return rsp.data
}
