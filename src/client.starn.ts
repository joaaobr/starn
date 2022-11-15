import type {Params} from './types/standard-params';
import type {DataSender} from './types/data-sender';
import type {Socket} from 'net';

import {ConnectStarn} from './connect.starn';
import {DataStarn} from './data.starn';
import {TopicsStarn} from './topics.starn';

export class Client {
	private static readonly data: DataStarn = new DataStarn();
	connection: Socket;
	topics: TopicsStarn;

	constructor(dataConnection: Params) {
		this.connection = new ConnectStarn(dataConnection).getConnection();
		this.topics = new TopicsStarn();
	}

	getMessage(
		topic: string,
		callback: (data: any, time: number, topic: string) => void,
	): void {
		this.connection.write(
			JSON.stringify({messageSendindType: 'Topic Connected', topic}).concat(
				'\n',
			),
		);

		this.topics.validateTopic(topic, this.connection);

		this.connection.on('data', data => {
			const dataArray = Client.data.stringToArray(data);

			for (let i = 0; i < dataArray.length - 1; i++) {
				const message: DataSender = Client.data.parse(dataArray[i]);

				if (message.topic === topic) {
					if (message.messageState === 'string') {
						// eslint-disable-next-line @typescript-eslint/no-base-to-string
						message.message = String(message.message.toString());
					}

					callback(message.message, message.time, message.topic);
				}
			}
		});
	}
}
