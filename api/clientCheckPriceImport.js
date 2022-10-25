import axios from "axios";
import { ipAddress } from "../contains/constant";
const url = "/api/import-check";
export default axios.create({
  baseURL: ipAddress + url,
});
