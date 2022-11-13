import type {Socket} from 'net';
import {SendMessage} from './send-message';
import {GetMessage} from './get-message';
import {DataStarn} from '../data.starn';

export class MessageMenager {
	private static readonly send: SendMessage = new SendMessage();
	private static readonly get: GetMessage = new GetMessage(
		MessageMenager.send.getEvent(),
	);

	private static readonly data: DataStarn = new DataStarn();

	topics?: string[];

	setTopics(topics: string[]) {
		this.topics = topics;
	}

	messageMenager(socket: Socket) {
		socket.on('data', data => {
			const messages = MessageMenager.data.stringToArray(data);

			for (let i = 0; i < messages.length - 1; i++) {
				const message = MessageMenager.data.parse(messages[i]);

				switch (message.messageSendindType) {
					case 'Validate Topic':
						MessageMenager.send.sendEventMessage({
							topics: this.topics,
						});
						break;

					case 'Send Message':
						MessageMenager.send.sendEventMessage({
							message: message.message,
							time: message.time,
							topic: message.topic,
						});
						break;

					default:
						break;
				}
			}
		});
	}
}
