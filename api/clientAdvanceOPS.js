import axios from "axios";
import { ipAddress } from "../contains/constant";

const url = "/api/advance-ops";
export default axios.create({
  baseURL: ipAddress + url,
});
