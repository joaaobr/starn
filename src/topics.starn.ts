import type {Socket} from 'net';
import type {DataSender} from './types/data-sender';

import {DataStarn} from './data.starn';
import {TopicErros} from './errors/topic.erros';
import crypto from 'crypto';

export class TopicsStarn {
	isTopic(topics: string[], topic: string): boolean {
		for (const data of topics) {
			if (data === topic) {
				return true;
			}
		}

		return false;
	}

	topicExists(topic: string, connection: Socket): boolean {
		const idOfMessage = crypto.randomBytes(9).toString('hex');
		const dataStarn = new DataStarn();

		connection.write(
			JSON.stringify({
				messageSendindType: 'Validate Topic',
				id: idOfMessage,
			}).concat('\n'),
		);

		connection.on('data', data => {
			const messagesList = dataStarn.toArray(data);

			for (let i = 0; i < messagesList.length - 1; i++) {
				const message: DataSender = dataStarn.parse(messagesList[i]);

				if (message.id === idOfMessage && message.topics && !this.isTopic(message.topics, topic)) {
					return new TopicErros(`topic ${topic} is not valid.`);
				}
			}
		});

		return true;
	}

	theTopicDoesNotExist(topic: string, connection: Socket) {
		const idOfMessage = crypto.randomBytes(9).toString('hex');
		const dataStarn = new DataStarn();

		connection.write(
			JSON.stringify({
				messageSendindType: 'Validate Topic',
				id: idOfMessage,
			}).concat('\n'),
		);

		connection.on('data', data => {
			const messagesList = dataStarn.toArray(data);
			for (let i = 0; i < messagesList.length - 1; i++) {
				const message: DataSender = dataStarn.parse(messagesList[i]);

				if (message.id === idOfMessage) {
					if (message.topics && this.isTopic(message.topics, topic)) {
						return new TopicErros(`the topic ${topic} already exists.`);
					}

					break;
				}
			}
		});

		return true;
	}
}
