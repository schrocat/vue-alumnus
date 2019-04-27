import axios from 'axios'
const config = {
  baseURL: 'http://stuer.ericwu.cn/api',
  timeout: 30000
}

const thirdHttp = axios.create(config)
export default thirdHttp
