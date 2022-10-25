import axios from "axios";
import { ipAddress } from "../contains/constant";
const url = "/api/cy-check";
export default axios.create({
  baseURL: ipAddress + url,
});
