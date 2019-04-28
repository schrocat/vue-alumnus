import http from './http'
const URL = '/administrators'
export async function getAdmins () {
  const rsp = await http.get(URL)
  return rsp.data
}
