import { Socket } from "net";
import { ParametersSender, DataSender } from "./interfaces.starn";
import { ConnectStarn } from "./connect.starn";
import { DataStarn } from "./data.starn";

export class SenderStarn {
    connection: Socket
    data: DataStarn
    type?: string

    constructor(params: ParametersSender) {
        this.connection = new ConnectStarn(params.connection).connect()
        this.type = params.typeMessage
        this.data = new DataStarn()
    }

    sendMessage(topic: any, data: any) {
        if(this.type) this.data.typesEquals(data, this.type)

        const message: DataSender = {
            topic, 
            messageSendindType: 'Send Message', 
            time: Date.now(),
            message: data
        }

        this.connection.write(this.data.objectToString(message).concat('\n'))
    }
}
