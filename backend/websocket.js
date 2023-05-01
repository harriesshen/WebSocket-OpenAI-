import WebSocket, { WebSocketServer } from "ws";
import chatAPI from "./openai.js";

export default function ws(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws) => {
    console.log("Client Connected");

    ws.on("message", async (data) => {
      //發送Client的訊息
      console.log("data", data);
      let mes = Buffer.from(data);
      //取得所有連接的client
      let clients = wss.clients;

      //發送給每個client訊息
      clients.forEach((client) => {
        client.send(mes.toString());
      });
      //ws.send(data);

      //利用openaiAPI進行聊天溝通
      const chatAPIMessage = await chatAPI(mes.toString());
      await clients.forEach((client) => {
        client.send(chatAPIMessage);
      });
      console.log("chat", chatAPIMessage);
    });

    ws.on("close", () => {
      // clearInterval(sendNowTime);
      console.log("Close connected");
    });
  });
}
