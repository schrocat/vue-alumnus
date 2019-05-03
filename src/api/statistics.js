import http from './http'
export async function workProperty (year) {
  var url = '/workProperty'
  if (year) {
    url += '?year=' + year
  }
  const rsp = await http.get(url)
  return rsp.data
}
export async function workLocation (year) {
  var url = '/location'
  if (year) {
    url += '?year=' + year
  }
  const rsp = await http.get(url)
  return rsp.data
}
export async function workPosition (year) {
  var url = '/position'
  if (year) {
    url += '?year=' + year
  }
  const rsp = await http.get(url)
  return rsp.data
}
export async function eRate (year) {
  var url = '/eRate'
  if (year) {
    url += '?year=' + year
  }
  const rsp = await http.get(url)
  return rsp.data
}
export async function modus (year) {
  var url = '/modus'
  if (year) {
    url += '?year=' + year
  }
  const rsp = await http.get(url)
  return rsp.data
}
