import type {Socket} from 'net';
import {SendMessage} from './events/send-message';
import {DataStarn} from '../data.starn';
import {ConnectedTopics} from './connected-topics';

export class MessageMenager {
	private static readonly send: SendMessage = new SendMessage();

	private static readonly data: DataStarn = new DataStarn();

	// eslint-disable-next-line @typescript-eslint/parameter-properties
	topics: string[];
	connectedTopics: ConnectedTopics;

	constructor(topics: string[]) {
		this.topics = topics;
		this.connectedTopics = new ConnectedTopics(topics);
	}

	messageMenager(socket: Socket): void {
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

					case 'Topic Connected':
						this.connectedTopics.addTopicConnected(message.topic);
						break;

					default:
						break;
				}
			}
		});
	}
}
