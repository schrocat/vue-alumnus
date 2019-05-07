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
export async function deepTotal () {
  var url = '/deepTotal'
  const rsp = await http.get(url)
  return rsp.data
}
export async function deep (year) {
  var url = '/deep'
  if (year) {
    url += `?year=${year}`
  }
  const rsp = await http.get(url)
  return rsp.data
}
export async function ySalary (year) {
  var url = '/ySalary'
  if (year) {
    url += `?year=${year}`
  }
  const rsp = await http.get(url)
  return rsp.data
}
export async function employment (year) {
  var url = '/employment'
  if (year) {
    url += `?year=${year}`
  }
  const rsp = await http.get(url)
  return rsp.data
}
export async function evaluate (year) {
  var url = '/evaluate'
  if (year) {
    url += `?year=${year}`
  }
  const rsp = await http.get(url)
  return rsp.data
}
