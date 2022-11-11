import type {Socket} from 'net';
import type {DataSender} from './interfaces.starn';

import {DataStarn} from './data.starn';
import {TopicErros} from './errors/topic.erros';

export class TopicsStarn {
	private static isTopic(topics: string[], topic: string): boolean {
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
			const dataArray = dataStarn.stringToArray(data);

			for (let i = 0; i < dataArray.length - 1; i++) {
				const message: DataSender = dataStarn.parse(dataArray[i]);

				if (message.topics && !TopicsStarn.isTopic(message.topics, topic)) {
					return new TopicErros(topic);
				}
			}
		});

		return true;
	}
}
