let OSS = require('ali-oss')
let client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI1DrOxy7HesyG',
  accessKeySecret: 'y0odKcZlwGr9JjtPq1CyyZutKmPJUe',
  bucket: 'schrocat'
})
const baseObjactName = 'alumnus-file'
export default {
  async upload (files) {
    try {
      console.log(files)
      for (var i = 0; i < files.length; i++) {
        let filename = files[i].name
        let rs = await client.put(filename, files[i])
        console.log(rs)
      }
    } catch (e) {
      console.log(e)
    }
  },
  // 简单批量下载,返回url数组
  downloadFileFromAliyuncsWithFileArrayWithName (fileNames) {
    let rs = []
    for (var i = 0; i < fileNames.length; i++) {
      let file = client.signatureUrl(fileNames[i])
      rs.push(file)
    }
    return rs
  },
  // 上传单个文件并返回文件url
  async uploadSingleLocalFileReturnFileUrl (file) {
    var timestamp = new Date().getTime()
    var objectName = baseObjactName + '-' + timestamp + '-' + file.name
    try {
      let rs = await client.put(objectName, file)
      return rs.url
    } catch (e) {
      return null
    }
  }
}
