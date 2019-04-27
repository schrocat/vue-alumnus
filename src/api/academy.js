import http from './http'

const url = '/academys'
export async function getAcademies () {
  const response = await http.get(url)
  return response.data
}
export async function updateAcademy (id, params) {
  const sUrl = url + '/' + id
  const response = await http.put(sUrl, params)
  return response.data
}
export async function deleteAcademy (id) {
  const sUrl = url + '/' + id
  const response = await http.delete(sUrl)
  console.log(response)
  return response.data
}
export async function insertAcademy (params) {
  const response = await http.post(url, params)
  return response.data
}
