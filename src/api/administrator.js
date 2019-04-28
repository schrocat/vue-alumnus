import http from './http'
const URL = '/administrators'
export async function getAdmins () {
  const rsp = await http.get(URL)
  return rsp.data
}
export async function updateAdmin (params) {
  const surl = URL + '/' + params.id
  const rsp = await http.put(surl,params)
  return rsp.data
}