import { Socket } from "net";
import { ParametersSender, DataSender } from "./interfaces.starn";
import { ConnectStarn } from "./connect.starn";
import { DataStarn } from "./data.starn";
import { TopicsStarn } from "./topics.starn";

export class SenderStarn {
    connection: Socket;
    data: DataStarn;
    type?: string;
    topics: TopicsStarn

    constructor(params: ParametersSender) {
        this.connection = new ConnectStarn(params.connection).connect();
        this.type = params.typeMessage;
        this.data = new DataStarn();
        this.topics = new TopicsStarn();
    }

    sendMessage(topic: any, data: any) {
        this.topics.getTopics(topic, this.connection);

        if(this.type) this.data.typesEquals(data, this.type);

        const message: DataSender = {
            topic, 
            messageSendindType: "Send Message", 
            time: Date.now(),
            message: data,
        };

        this.connection.write(JSON.stringify(message).concat('\n'), err => {
            if(err) throw err;
        });

        return true;
    }
}
