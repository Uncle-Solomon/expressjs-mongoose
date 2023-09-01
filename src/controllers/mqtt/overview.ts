import { Request, Response } from "express";
import { client } from "./test";

import { messagesType } from "../../utils/types";

const maxRecentMessages = 5; // Maximum number of recent messages to store
const receivedMessages: Record<string, Array<messagesType>> = {}; // Store recent messages by topic
let utility: boolean = false;
let gen01: boolean = false;
let gen02: boolean = false;
let gen03: boolean = false;
let gen335One: boolean = false;
let gen335Two: boolean = false;

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Subscribe to the specific topics
  client.subscribe("genReport");
  client.subscribe("utilAn");
  client.subscribe("outTopic");

  // Initialize the storage for each topic
  receivedMessages["genReport"] = [];
  receivedMessages["utilAn"] = [];
  receivedMessages["outTopic"] = [];

  client.on("message", (receivedTopic, message) => {
    // Check if the received topic is one of the desired topics
    if (receivedTopic === "genReport" || receivedTopic === "utilAn") {
      const topicMessages = receivedMessages[receivedTopic];
      let messageString = message.toString();
      if (messageString == "g01-running") {
        gen01 = true;
        gen02 = false;
        gen03 = false;
      } else if (messageString == "g02-running") {
        gen01 = false;
        gen02 = true;
        gen03 = false;
      } else if (messageString == "g03-running") {
        gen01 = false;
        gen02 = false;
        gen03 = true;
      } else if (messageString == "UTILPWA1") {
        utility = true;
      } else if (messageString == "UTILPWA0") {
        utility = false;
      }

      // Add the message and remove the oldest if needed
      topicMessages.push({
        topic: receivedTopic,
        message: messageString,
      });

      if (topicMessages.length > maxRecentMessages) {
        topicMessages.shift(); // Remove the oldest message
      }
    } else if (receivedTopic === "outTopic") {
      const topicMessages = receivedMessages[receivedTopic];
      let messageString = message.toString();
      // console.log(messageString);
      if (messageString == "335Gen01 has Started") {
        gen335One = true;
        gen335Two = false;
      }
      if (messageString == "335Gen02 has Started") {
        gen335One = false;
        gen335Two = true;
      }
      topicMessages.push({
        topic: receivedTopic,
        message: messageString,
      });

      if (topicMessages.length > maxRecentMessages) {
        topicMessages.shift(); // Remove the oldest message
      }
    }
  });
});

export const overview = async (req: Request, res: Response) => {
  // Return the most recent messages for each topic
  res.status(200).json({
    success: true,
    messages: receivedMessages,
    utility,
    gen01,
    gen02,
    gen03,
    gen335One,
    gen335Two,
  });
};
