import axios from "axios";

export default axios.create({baseURL: 'http://192.168.1.101:3001/api/quotations'})
