import http from './http'

const URL = '/majors'
export async function getMajors () {
  const res = await http.get(URL)
  return res.data
}
export async function updateMajor (id, params) {
  const sUrl = URL + '/' + id
  const res = await http.put(sUrl, params)
  return res.data
}
export async function deleteMajor (id) {
  const sUrl = URL + '/' + id
  const res = await http.delete(sUrl)
  return res.data
}
export async function insertMajor (params) {
  const res = await http.post(URL, params)
  return res.data
}
export async function showMajor (mid) {
  const surl = URL + '/' + mid
  const res = await http.get(surl)
  return res.data
}
