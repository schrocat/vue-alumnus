import http from './http'
const URL = '/students'
export async function getStudents (params) {
  const url = '/getStudents'
  const rsp = await http.post(url,params)
  return rsp.data
}
