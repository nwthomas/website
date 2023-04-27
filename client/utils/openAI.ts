import { OPEN_AI_QUERY_ROUTE } from "../constants/routes";
import axios from "axios";

export async function sendOpenAIQuery(query: string) {
  return axios.post(OPEN_AI_QUERY_ROUTE, { query });
}
