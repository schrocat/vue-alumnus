import axios from 'axios'
const config = {
  baseURL: 'http://127.0.0.1:7001/api',
  timeout: 30000
}

const http = axios.create(config)
export default http
