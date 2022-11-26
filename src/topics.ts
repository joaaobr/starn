import type {Socket} from 'net';
import type {DataSender} from './types/data-sender';

import {Data} from './data';
import {TopicErros} from './errors/topic.erros';
import crypto from 'crypto';

export class Topics {
	private static readonly data: Data = new Data();

	topicExists(topic: string, connection: Socket): boolean {
		const idOfMessage = crypto.randomBytes(9).toString('hex');

		connection.write(
			JSON.stringify({
				messageSendindType: 'Get Topics',
				id: idOfMessage,
			}).concat('\n'),
		);

		connection.on('data', data => {
			const messagesList = Topics.data.toArray(data);

			for (let i = 0; i < messagesList.length - 1; i++) {
				const message: DataSender = Topics.data.parse(messagesList[i]);

				if (message.id === idOfMessage) {
					if (message.topics && !message.topics.includes(topic)) {
						return new TopicErros(`topic ${topic} is not valid.`);
					}

					return;
				}
			}
		});

		return true;
	}
}
