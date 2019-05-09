import http from './http'
const URL = '/posts'
export async function getPosts (offset, pageSize, checked) {
  const surl = `${URL}?offset=${offset}&pageSize=${pageSize}&checked=${checked}`
  const rsp = await http.get(surl)
  return rsp.data
}
