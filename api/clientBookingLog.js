import axios from "axios";
import { ipAddress } from "../contains/constant";
const url = "/api/booking-log";
export default axios.create({
  baseURL: ipAddress + url,
});
