import type {Socket} from 'net';
import type {DataSender} from './types/data-sender';

import {DataStarn} from './data.starn';
import {TopicErros} from './errors/topic.erros';

export class TopicsStarn {
	isTopic(topics: string[], topic: string): boolean {
		for (const tpc of topics) {
			if (tpc === topic) {
				return true;
			}
		}

		return false;
	}

	validateTopic(topic: string, connection: Socket): boolean {
		const dataStarn = new DataStarn();

		connection.write(
			JSON.stringify({
				messageSendindType: 'Validate Topic',
			}).concat('\n'),
		);

		connection.on('data', data => {
			const messagesList = dataStarn.toArray(data);

			for (let i = 0; i < messagesList.length - 1; i++) {
				const message: DataSender = dataStarn.parse(messagesList[i]);

				if (message.topics && !this.isTopic(message.topics, topic)) {
					return new TopicErros(`topic ${topic} is not valid.`);
				}
			}
		});

		return true;
	}
}
