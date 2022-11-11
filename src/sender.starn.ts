import type {Socket} from 'net';
import type {ParametersSender, DataSender, Message, ArrayMessage} from './interfaces.starn';
import {ConnectStarn} from './connect.starn';
import {DataStarn} from './data.starn';
import {TopicsStarn} from './topics.starn';

export class SenderStarn {
	connection: Socket;
	data: DataStarn;
	type?: string;
	topics: TopicsStarn;

	constructor(params: ParametersSender) {
		this.connection = new ConnectStarn({port: params.port, host: params.host}).connect();
		this.type = params.typeMessage;
		this.data = new DataStarn();
		this.topics = new TopicsStarn();
	}

	sendMessage(topic: string, data: Message | ArrayMessage) {
		this.topics.getTopics(topic, this.connection);

		if (this.type) {
			this.data.typesEquals(data, this.type);
		}

		const messageToBeSent: DataSender = {
			topic,
			messageSendindType: 'Send Message',
			time: Date.now(),
			message: data,
		};

		this.connection.write(JSON.stringify(messageToBeSent).concat('\n'), err => {
			if (err) {
				throw err;
			}
		});

		return true;
	}
}
