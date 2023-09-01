import { Request, Response } from "express";
import { client } from "./test";
import { messagesType } from "./getAllMessages";

const receivedMessages: Array<messagesType> = []; // Array to store received messages

let portenta01: boolean = false;
let portenta02: boolean = false;
let portenta03: boolean = false;
let portenta03ii: boolean = false;
let portenta04: boolean = false;
let portenta05: boolean = false;
let portenta06: boolean = false;

let portenta02int: boolean = false;
let portenta03int: boolean = false;
let portenta04int: boolean = false;
let portenta08: boolean = false;

let nodecontroller: boolean = false;
let resetNode: boolean = false;

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("outTopic");
  client.subscribe("willTopicController");
  client.subscribe("willTopicRst");
  client.subscribe("willTopic01");
  client.subscribe("willTopic02");
  client.subscribe("willTopic02Int");
  client.subscribe("willTopic03");
  client.subscribe("willTopic03Int");
  client.subscribe("willTopic04");
  client.subscribe("willTopic04Int");
  client.subscribe("willTopic05");
  client.subscribe("willTopic06");
  client.subscribe("willTopic08");

  client.on("message", (receivedTopic, message) => {
    const messageString = message.toString();

    if (receivedTopic === "outTopic") {
      if (messageString == "Pt-node-02-in") {
        portenta02int = true;
      } else if (messageString == "Pt-node-03-in connected") {
        portenta03int = true;
      } else if (messageString == "pt-node-04-in connected") {
        portenta04int = true;
      } else if (messageString == "pt-node-08 connected") {
        portenta08 = true;
      } else if (messageString == "Reset-node connected") {
        resetNode = true;
      } else if (messageString == "Node-controller connected") {
        nodecontroller = true;
      } else if (messageString == "Pt-node-01 connected") {
        portenta01 = true;
      } else if (messageString == "Pt-node-02 connected") {
        portenta02 = true;
      } else if (messageString == "Pt-node-03 connected") {
        portenta03 = true;
      } else if (messageString == "Pt-node-03-II connected") {
        portenta03ii = true;
      } else if (messageString == "Pt-node-04 connected") {
        portenta04 = true;
      } else if (messageString == "Pt-node-05 connected") {
        portenta05 = true;
      } else if (messageString == "Pt-node-06 connected") {
        portenta06 = true;
      }
      receivedMessages.push({
        topic: receivedTopic,
        message: message.toString(),
      });
      if (receivedMessages.length > 20) {
        receivedMessages.shift();
      }
    } else {
      if (messageString == "n02-int disconnected") {
        portenta02int = false;
      } else if (messageString == "n03-int disconnected") {
        portenta03int = false;
      } else if (messageString == "n04-int disconnected") {
        portenta04int = false;
      } else if (messageString == "n08 disconnected") {
        portenta08 = false;
      } else if (messageString == "rst node disconnected") {
        resetNode = false;
      } else if (messageString == "n-control disconnected") {
        nodecontroller = false;
      } else if (messageString == "n01 disconnected") {
        portenta01 = false;
      } else if (messageString == "n02 disconnected") {
        portenta02 = false;
      } else if (messageString == "n03 disconnected") {
        portenta03 = false;
      } else if (messageString == "n03-II disconnected") {
        portenta03ii = false;
      } else if (messageString == "n04 disconnected") {
        portenta04 = false;
      } else if (messageString == "n05 disconnected") {
        portenta05 = false;
      } else if (messageString == "n06 disconnected") {
        portenta06 = false;
      }
      receivedMessages.push({
        topic: receivedTopic,
        message: message.toString(),
      });
      if (receivedMessages.length > 20) {
        receivedMessages.shift();
      }
    }
  });
});

export const getBoards = async (req: Request, res: Response) => {
  // Return the received messages for the "outTopic" in the response

  res.status(200).json({
    success: true,
    messages: receivedMessages,
    portenta01,
    portenta02,
    portenta03,
    portenta03ii,
    portenta04,
    portenta05,
    portenta06,
    portenta02int,
    portenta03int,
    portenta04int,
    portenta08,
    nodecontroller,
    resetNode,
  });
};
