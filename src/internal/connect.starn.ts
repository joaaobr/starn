import { ParametersConnectionStarn } from "./interfaces.starn";
import net from "net";

export class ConnectStarn {
  connection: net.Socket;

  constructor(connect: ParametersConnectionStarn) {
    this.connection = net
      .createConnection({ port: connect.port })
      .on("error", (err) => {
        throw err;
      });
  }

  connect(): net.Socket {
    return this.connection
  }
}
