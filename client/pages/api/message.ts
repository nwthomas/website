import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";
const ENDPOINT = `${SERVER_URL}/api/send-message`;

export interface EmailType {
  name: string;
  email: string;
  message: string;
  fax?: string;
}

export async function sendMessage(email: EmailType) {
  return axios.post(ENDPOINT, email);
}
