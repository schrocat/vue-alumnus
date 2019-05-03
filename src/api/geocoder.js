import bdhttp from './baidu'
export async function geocoder (l) {
  const surl = `/geocoder/v2/?callback=renderReverse&location=${l.lng},${l.lat}&output=json&pois=1&latest_admin=1&ak=HGvWdWGbxLlxvNWe7iFueKB9G5qGmY1S`
  const rsp = await bdhttp.get(surl)
  return rsp
}
