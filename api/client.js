import axios from "axios";

export default axios.create({baseURL: 'http://192.168.1.82:3001/api/quotations'})