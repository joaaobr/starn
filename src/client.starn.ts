import { ConnectStarn } from "./connect.starn";
import { ParametersConnectionStarn } from "./interfaces.starn";
import { Socket } from 'net'
import { DataStarn } from "./data.starn";
import { TopicsStarn } from "./topics.starn";

export class ClientStarn {
    connection: Socket;
    data: DataStarn;
    topics: TopicsStarn;

    constructor(dataConnection: ParametersConnectionStarn) {
        this.connection = new ConnectStarn(dataConnection).connect();
        this.data = new DataStarn();
        this.topics = new TopicsStarn();
    }

    getMessage(topic: string, callback: (data: any, time: number, topic: string) => void) {
        this.topics.getTopics(topic, this.connection);

        this.connection.on('data', data => {
          const dataArray = this.data.stringToArray(data);
          
          for(let i = 0; i < dataArray.length - 1; i++) {  
            const message = JSON.parse(dataArray[i]);
            
            if(message.topic == topic) {
              callback(
                message.message,
                message.time,
                message.topic
              );
            }
    
          }
        } 
        );
      }
}