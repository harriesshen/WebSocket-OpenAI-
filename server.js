import { Configuration, OpenAIApi } from "openai";
const openAPiKey = "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";
const configuration = new Configuration({
  organization: "org-dmMIKxscxIBZkk1UIH6Jqg0G",
  apiKey: openAPiKey,
});
const openai = new OpenAIApi(configuration);

import express from "express";
import WebSocket, { WebSocketServer } from "ws";

// const express = require("express");
// const SocketServer = ws.Server;

const PORT = 3000;
const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

const chatAPI = async (message) => {
  console.log("mes", message);
  const data = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
    // prompt: messag,
    // temperature: 0,
    // max_tokens: 100,
    // top_p: 1,
    // frequency_penalty: 0.0,
    // presence_penalty: 0.0,
    // stop: ["\n"],
  });

  console.log("mes", data.data.choices[0].message.content);
  return data.data.choices[0].message.content;
};

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
