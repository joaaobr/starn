import type {Params} from './types/standard-params';
import type {Socket} from 'net';

import {ConnectStarn} from './connect.starn';
import {DataStarn} from './data.starn';
import {TopicsStarn} from './topics.starn';
import crypto from 'crypto';
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
			JSON.stringify({messageSendindType: 'Topic Connected', topic, id: crypto.randomBytes(9).toString('hex')}).concat(
				'\n',
			),
		);

		this.topics.validateTopic(topic, this.connection);

		this.connection.on('data', data => {
			const dataArray = Client.data.stringToArray(data);
			for (let i = 0; i < dataArray.length - 1; i++) {
				const message: any = Client.data.parse(dataArray[i]);

				if (message.topic === topic) {
					if (message.messageState === 'string') {
						message.message = Buffer.from(message.message.data).toString();
					}

					callback(message.message, message.time, message.topic);
				}
			}
		});
	}

	diconnect(topic: string) {
		this.connection.write(
			JSON.stringify({messageSendindType: 'Topic Disconnected', topic}).concat(
				'\n',
			),
		);
	}
}
