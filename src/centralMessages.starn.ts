import { ParametersStarn } from "./interfaces.starn";
import { EventEmitter, on } from "events";
import { DataStarn } from "./data.starn";
import process from "process";
import net from "net";

export class CentralMessages {
  port: number;
  host?: string;
  event: EventEmitter;
  socket: net.Server;
  topics: Array<string>;
  data: DataStarn;

  sendMessage(message: object) {
    process.nextTick(() => this.event.emit("message", JSON.stringify(message).concat("\n")));
  }

  constructor(Params: ParametersStarn) {
    this.port = Params.port;
    this.host = Params.host;
    this.topics = Params.topics;

    this.event = new EventEmitter();
    this.data = new DataStarn();

    this.socket = net
      .createServer(async socket => {
        
        socket.on("data", data => {
          const messages = this.data.stringToArray(data);

          for (let i = 0; i < messages.length - 1; i++) {
            const message = JSON.parse(messages[i]);

            switch(message.messageSendindType) {

              case("Validate Topic"):
                this.sendMessage({
                    topics: this.topics,
                  });

              case("Send Message"):
                this.sendMessage({
                    message: message.message,
                    time: message.time,
                    topic: message.topic,
                });
            }
          }
        });

        for await (const data of on(this.event, "message")) {
          socket.write(data[0]);
        }
        
      })
      .listen(this.port, this.host);
  }
}
