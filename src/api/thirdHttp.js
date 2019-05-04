import axios from 'axios'
const config = {
  baseURL: '/ericwu',
  timeout: 30000
}
const thirdHttp = axios.create(config)
export default thirdHttp
