import http from './http'
const baseUrl = '/oas'
export async function postOa (params) {
  const rsp = await http.post(baseUrl, params)
  return rsp
}
export async function getOas (type, offset, pageSize) {
  const url = baseUrl + `?type=${type}&offset=${offset}&pageSize=${pageSize}`
  const rsp = await http.get(url)
  return rsp.data
}
export async function getOaById (id) {
  const url = baseUrl + `/${id}`
  const rsp = await http.get(url)
  return rsp.data
}
export async function deleteOa (id) {
  const url = baseUrl + `/del/${id}`
  const rsp = await http.delete(url)
  return rsp.data
}
export async function updateOa (id, params) {
  const url = baseUrl + '/' + id
  const rsp = await http.put(url, params)
  return rsp.data
}
export async function fDeleteOa (id) {
  const url = baseUrl + `/${id}`
  const rsp = await http.delete(url)
  return rsp.data
}
