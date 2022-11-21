import type {Socket} from 'net';
import type {DataSender} from './types/data-sender';

import {DataStarn} from './data.starn';
import {TopicErros} from './errors/topic.erros';
import crypto from 'crypto';

export class TopicsStarn {
	private static readonly dataStarn: DataStarn = new DataStarn();

	topicExists(topic: string, connection: Socket): boolean {
		const idOfMessage = crypto.randomBytes(9).toString('hex');

		connection.write(
			JSON.stringify({
				messageSendindType: 'Get Topics',
				id: idOfMessage,
			}).concat('\n'),
		);

		connection.on('data', data => {
			const messagesList = TopicsStarn.dataStarn.toArray(data);

			for (let i = 0; i < messagesList.length - 1; i++) {
				const message: DataSender = TopicsStarn.dataStarn.parse(
					messagesList[i],
				);

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
