import axios from "axios";
import { ipAddress } from "../contains/constant";
const url = "/api/log-check";
export default axios.create({
  baseURL: ipAddress + url,
});
