import type {Socket} from 'net';
import {AccumulatedMessages} from './message-store-menager';
import {SendMessage} from '../events/send-message';
import {DataStarn} from '../../data.starn';
import {ConnectedTopics} from '../connected-topics';
import {TopicsStarn} from '../../topics.starn';
import {TopicErros} from '../../errors/topic.erros';

export class MessageMenager {
	private static readonly send: SendMessage = new SendMessage();
	private static readonly data: DataStarn = new DataStarn();
	private static readonly topicsStarn: TopicsStarn = new TopicsStarn();

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
						if (!MessageMenager.topicsStarn.isTopic(this.topics, message.topic)) {
							return new TopicErros(message.topic);
						}

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
							MessageMenager.send.sendEventMessage(messagesOfTopic);

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
