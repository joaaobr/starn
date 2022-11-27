import type {Params} from './types/standard-params';
import type {Message} from './types/message';
import type {Socket} from 'net';

import {Connection} from './connection';
import {Data} from './data';
import {Topics} from './topics';
import crypto from 'crypto';
export class Client {
	private static readonly data: Data = new Data();
	private static readonly topics: Topics = new Topics();
	connection: Socket;

	constructor(dataConnection: Params) {
		this.connection = new Connection(dataConnection).getConnection();
	}

	getMessage(
		topic: string,
		callback: (message: Message, time: number, topic: string) => void,
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
