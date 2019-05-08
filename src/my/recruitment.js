import http from './http'
const URL = '/recruitment'
export async function recruitment (offset = 0, pageSize = 1000000, status = 0) {
  const surl = `${URL}?offset=${offset}&pageSize=${pageSize}&status=${status}`
  const rsp = await http.get(surl)
  return rsp.data
}
export async function updateRecruitment (id, params) {
  const surl = URL + '/' + id
  const rsp = await http.put(surl, params)
  return rsp.data
}
export async function recTotal () {
  const rsp = await http.get('/recTotal')
  return rsp.data
}
