import { Request, Response } from "express";
import { client } from "./test";

export interface messagesType {
  topic: string;
  message: string;
}

const receivedMessages: Array<messagesType> = []; // Array to store received messages

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("#");

  client.on("message", (receivedTopic, message) => {
    receivedMessages.push({
      topic: receivedTopic,
      message: message.toString(),
    });
    if (receivedMessages.length > 15) {
      receivedMessages.shift();
    }
  });
});

export const getMessages = async (req: Request, res: Response) => {
  // Return all received messages in the array
  res.status(200).json({ success: true, messages: receivedMessages });
};
