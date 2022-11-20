import type {Params} from './types/standard-params';
import type {Socket} from 'net';

import {ConnectStarn} from './connect.starn';
import {DataStarn} from './data.starn';
import {TopicsStarn} from './topics.starn';
import crypto from 'crypto';
export class Client {
	private static readonly data: DataStarn = new DataStarn();
	private static readonly topics: TopicsStarn = new TopicsStarn();
	connection: Socket;

	constructor(dataConnection: Params) {
		this.connection = new ConnectStarn(dataConnection).getConnection();
	}

	getMessage(
		topic: string,
		callback: (data: any, time: number, topic: string) => void,
	): void {
		this.connection.write(
			JSON.stringify({
				messageSendindType: 'Topic Connected',
				topic,
				id: crypto.randomBytes(9).toString('hex'),
			}).concat('\n'),
		);

		Client.topics.topicExists(topic, this.connection);

		this.connection.on('data', data => {
			const messagesList = Client.data.toArray(data);

			for (let i = 0; i < messagesList.length - 1; i++) {
				const message: any = Client.data.parse(messagesList[i]);

				if (
					message.topic === topic
          && message.messageSendindType === 'Send Message'
				) {
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
			JSON.stringify({
				messageSendindType: 'Disconnect Topic',
				topic,
			}).concat('\n'),
		);
	}
}
