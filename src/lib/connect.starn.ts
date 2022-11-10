import { ParametersConnectionStarn } from "./interfaces.starn";
import { createConnection, Socket } from "net";

export class ConnectStarn {
  connection: Socket;

  constructor(connect: ParametersConnectionStarn) {
    this.connection = createConnection({ port: connect.port })
      .on("error", err => {
        throw err;
      });

  }

  connect(): Socket {
    return this.connection;
  }
}
