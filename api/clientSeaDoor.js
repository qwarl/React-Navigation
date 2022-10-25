import axios from "axios";
import { ipAddress } from "../contains/constant";
const url = "/api/sea-door";
export default axios.create({ baseURL: ipAddress + url });
