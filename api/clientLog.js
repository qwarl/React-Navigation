import axios from "axios";
import { ipAddress } from "../contains/constant";
const url = "/api/phongLogs";
export default axios.create({ baseURL: ipAddress + url });
