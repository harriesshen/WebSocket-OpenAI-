import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
const dotEnvResult = dotenv.config({ path: "../.env" }).parsed;
const openAPiKey = dotEnvResult.OPENAI_KEY;
const configuration = new Configuration({
  organization: "org-dmMIKxscxIBZkk1UIH6Jqg0G",
  apiKey: openAPiKey,
});

export default async function chatAPI(message) {
  const openai = new OpenAIApi(configuration);
  console.log("mes", message);
  const data = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });

  console.log("mes", data.data.choices[0].message.content);
  return data.data.choices[0].message.content;
}
