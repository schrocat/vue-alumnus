import http from './http'
export async function workProperty (year) {
  var url = '/workProperty'
  if (year) {
    url += '?year=' + year
  }
  const rsp = await http.get(url)
  return rsp.data
}
