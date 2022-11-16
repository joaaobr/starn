import type {Socket} from 'net';
import {AccumulatedMessages} from './message-store-menager';
import {SendMessage} from '../events/send-message';
import {DataStarn} from '../../data.starn';
import {ConnectedTopics} from '../connected-topics';

export class MessageMenager {
	private static readonly send: SendMessage = new SendMessage();
	private static readonly data: DataStarn = new DataStarn();

	connectedTopics: ConnectedTopics;
	private readonly store: AccumulatedMessages;

	// eslint-disable-next-line @typescript-eslint/parameter-properties, @typescript-eslint/member-ordering
	topics: string[];

	constructor(topics: string[]) {
		this.topics = topics;
		this.store = new AccumulatedMessages(topics);
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
							message: 0,
							time: 0,
							messageSendindType: 'Validate Topic',
							topic: '',
						});
						break;

					case 'Send Message':
						// eslint-disable-next-line no-negated-condition
						if (!this.connectedTopics.topicIsConnected(message.topic)) {
							this.store.addMessage(message.topic, {
								message: message.message,
								time: message.time,
								topic: message.topic,
								messageSendindType: 'Send Message',
							});
						} else {
							MessageMenager.send.sendEventMessage({
								message: message.message,
								time: message.time,
								topic: message.topic,
								messageSendindType: 'Topic Connected',
							});
						}

						break;

					case 'Topic Connected':
						this.connectedTopics.addTopicConnected(message.topic);

						if (this.store.theTopicHasMessagesStored(message.topic)) {
							const messagesOfTopic = this.store.receiveMessageFrom(
								message.topic,
							);
							for (const messageOfTopic of messagesOfTopic) {
								MessageMenager.send.sendEventMessage({
									message: messageOfTopic.message,
									time: messageOfTopic.time,
									topic: messageOfTopic.topic,
									messageSendindType: 'Send Message',
								});
							}

							this.store.removeMessagesFrom(message.topic);
						}

						break;

					case 'Topic Disconnected':
						this.connectedTopics.disconnectTopic(message.topic);
						break;
					default:
						break;
				}
			}
		});
	}
}
