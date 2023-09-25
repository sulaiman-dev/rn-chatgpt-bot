import axios from "axios";
import { OPENAI_API_KEY } from "react-native-dotenv";

const api = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
});

export const getChatGPTResponse = async (message) => {
  try {
    const response = await api.post("/", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return null;
  }
};
