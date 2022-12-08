import axios from "axios";
import { ipAddress } from "../contains/constant";

const url = "/api/itemAdvance";
export default axios.create({
  baseURL: ipAddress + url,
});
