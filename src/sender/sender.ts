import type { Socket } from "net";
import type { ParametersSender } from "../types/parameters-sender";
import type { Message } from "../types/message";
import { Data } from "../data";

import { Connection } from "../connection";
import { SendMessage } from "./send-message";

export class Sender {
  private static readonly data: Data = new Data();
  private static readonly send: SendMessage = new SendMessage();
  messageType?: string;
  private readonly connection: Socket;

  constructor(params: ParametersSender) {
    this.connection = new Connection({
      port: params.port,
      host: params.host,
    }).getConnection();
    this.messageType = params.typeMessage;
  }

  sendMessage(topic: string, message: Message): boolean {
    if (this.messageType) {
      Sender.data.typesAreEquals(message, this.messageType);
    }

    Sender.send.sendMessageToClient(topic, message, this.connection);

    return true;
  }
}
