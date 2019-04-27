export function htmlToString (str) {
  var dd = str.replace(/<\/?.+?>/g, '')
  var s = dd.replace(/ /g, '')
  return s
}
