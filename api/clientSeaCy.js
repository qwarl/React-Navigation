import axios from "axios";
import { ipAddress } from "../contains/constant";
const url = "/api/sea-cy";
export default axios.create({ baseURL: ipAddress + url });
