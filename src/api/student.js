import http from './http'
const URL = '/students'
export async function getStudents (params) {
  const url = '/getStudents'
  const rsp = await http.post(url,params)
  return rsp.data
}
export async function deleteStudent (mid) {
  const surl = URL + '/' + mid
  const rsp = await http.delete(surl)
  return rsp.data
}
export async function updateStudent (mid, params) {
  const surl = URL + '/' + mid
  const rsp = await http.put(surl,params)
  return rsp.data
}
export async function insertStudent (params) {
  const rsp = await http.post(params)
  return rsp.data
}