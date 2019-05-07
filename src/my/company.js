import http from './http'
const URL = '/company'
export async function company (offset = 0, pageSize = 1000) {
  const surl = `${URL}?offset=${offset}&pageSize=${pageSize}`
  const rsp = await http.get(surl)
  return rsp.data
}
export async function total () {
  const surl = '/comTotal'
  const rsp = await http.get(surl)
  return rsp.data
}
export async function deleteCompany (id) {
  const surl = URL + '/' + id
  const rsp = await http.delete(surl)
  return rsp.data
}
