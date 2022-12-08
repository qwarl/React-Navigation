import axios from "axios";
import { ipAddress } from "../contains/constant";
const url = "/api/report-log";
export default axios.create({ baseURL: ipAddress + url });
