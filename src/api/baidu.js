import axios from 'axios'
const config = {
  baseURL: '/geocoder',
  timeout: 30000
}

const bdhttp = axios.create(config)
export default bdhttp
