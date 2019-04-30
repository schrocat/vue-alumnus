import http from './http'
const URL = '/administrators'
export async function getAdmins () {
  const rsp = await http.get(URL)
  return rsp.data
}
export async function updateAdmin (id, params) {
  const surl = URL + '/' + id
  const rsp = await http.put(surl, params)
  return rsp.data
}
export async function insertAdmin (params) {
  const rsp = await http.post(URL, params)
  return rsp.data
}
export async function deleteAdmin (id) {
  const surl = URL + '/' + id
  const rsp = await http.delete(surl)
  return rsp.data
}
