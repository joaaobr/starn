import { Socket } from "net";
import { DataStarn } from "./data.starn";
import { TopicErros } from "./errors/topic.erros";

export class TopicsStarn {
    isTopic(topics: Array<string>, topic: string) {
        for(const tpc of topics) {
            if(tpc == topic) return true
        }

        return false;
    }
    getTopics(topic: string, connection: Socket) {
        const dataStarn = new DataStarn()

        connection.write(JSON.stringify({
            messageSendindType: "Validate Topic"
        })
        .concat('\n'));

        connection.on('data', data => {
            const dataArray = dataStarn.stringToArray(data)

            for(let i = 0; i < dataArray.length - 1; i++) {
                const message = JSON.parse(dataArray[i])

                if(message.topics && !this.isTopic(message.topics, topic)) {
                    return new TopicErros(topic);
                }
            }
        })

        return true;
    }

}