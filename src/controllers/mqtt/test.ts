import { Request, Response } from "express";
import * as mqtt from "mqtt";

const brokerAddress = "mqtt://192.168.100.190";

export const client = mqtt.connect(brokerAddress, {
  clientId: "mqtt-reciever",
});

export const test = async (req: Request, res: Response) => {
  let { requestTest } = req.body;
  let topic = requestTest;

  if (!requestTest) {
    res.status(422).json({
      request: "failed",
    });
  } else {
    client.subscribe("#");

    // Move the message event listener outside of the else block
    client.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        const messageString = message.toString();
        // Respond to the HTTP request only once
        if (!res.headersSent) {
          res.status(200).json({
            topic: receivedTopic,
            message: messageString,
          });
        }
      }
    });
  }
};
