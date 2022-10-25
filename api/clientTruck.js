import axios from "axios";
import { ipAddress } from "../contains/constant";

const url = "/api/truck";
export default axios.create({ baseURL: ipAddress + url });
