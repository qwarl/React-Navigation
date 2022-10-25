import axios from "axios";
import { ipAddress } from "../contains/constant";
const url = "/api/air-lcl-check";
export default axios.create({
  baseURL: ipAddress + url,
});
