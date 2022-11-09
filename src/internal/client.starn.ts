import { ConnectStarn } from "./connect.starn";
import { ParametersConnectionStarn } from "./interfaces.starn";
import { Socket } from 'net'
import { DataStarn } from "./data.starn";

export class ClientStarn {
    connection: Socket
    data: DataStarn

    constructor(dataConnection: ParametersConnectionStarn) {
        this.connection = new ConnectStarn(dataConnection).connect()
        this.data = new DataStarn()

    }

    getMessage(topic: string, callback: (data: any ) => void) {
    
        this.connection.on('data', data => {
    
          const dataString = this.data.stringToArray(data)
          
          for(let i = 0; i < dataString.length - 1; i++) {
            
            const message = JSON.parse(dataString[i])
    
            if(message.topic == topic) {
              callback({
                message: message.message,
                time: message.time,
                topic: message.topic
              })
            }
    
          }
        } 
        );
      }
}