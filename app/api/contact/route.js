import axios from "axios";

export async function sendMessage(data) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIL_LAMBDA_URL}`,
    data
  );
  return response;
}