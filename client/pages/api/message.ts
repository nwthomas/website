import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";

export interface EmailType {
  name: string;
  email: string;
  message: string;
  fax?: string;
}

export async function sendMessage(email: EmailType) {
  return axios.post(SERVER_URL, email);
}
