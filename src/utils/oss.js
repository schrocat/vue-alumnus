let OSS = require('ali-oss')
let client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI1DrOxy7HesyG',
  accessKeySecret: 'y0odKcZlwGr9JjtPq1CyyZutKmPJUe',
  bucket: 'schrocat'
})
// 文件名的基本名
const baseObjactName = 'alumnus-file'
export default {
  // 上传多个文件
  async uploadMutilLocalFiles (files) {
    // 时间戳，用于生成文件名，防止上传到OSS的bucket覆盖掉已有的文件
    var timestamp = new Date().getTime()
    var result = []
    try {
      for (var i = 0; i < files.length; i++) {
        // OSS对象名
        var objectName = baseObjactName + '-' + timestamp + '-' + files[i].name
        // 调用阿里云OSS的put接口
        var rs = await client.put(objectName, files[i])
        var elem = {}
        elem.name = rs.name
        elem.url = rs.url
        // 返回结果
        result.push(elem)
      }
    } catch (e) {
      console.log(e)
    }
    return result
  },
  // 上传单个文件
  async uploadSingleLocalFiles (file) {
    var timestamp = new Date().getTime()
    var objectName = baseObjactName + '-' + timestamp + '-' + file.name
    try {
      var rs = await client.put(objectName, file)
      return rs
    } catch (e) {
      console.log(e)
    }
  }
}
