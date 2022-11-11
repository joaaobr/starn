import {ConnectStarn} from './connect.starn';
import {DataStarn} from './data.starn';
import {TopicsStarn} from './topics.starn';

import type {ParametersConnectionStarn, DataSender} from './interfaces.starn';
import type {Socket} from 'net';

export class ClientStarn {
	private static readonly data: DataStarn = new DataStarn();
	connection: Socket;
	topics: TopicsStarn;

	constructor(dataConnection: ParametersConnectionStarn) {
		this.connection = new ConnectStarn(dataConnection).connect();
		this.topics = new TopicsStarn();
	}

	getMessage(
		topic: string,
		callback: (data: any, time: number, topic: string) => void,
	): void {
		this.topics.validateTopic(topic, this.connection);

		this.connection.on('data', data => {
			const dataArray = ClientStarn.data.stringToArray(data);

			for (let i = 0; i < dataArray.length - 1; i++) {
				const message: DataSender = ClientStarn.data.parse(dataArray[i]);

				if (message.topic === topic) {
					callback(message.message, message.time, message.topic);
				}
			}
		});
	}
}