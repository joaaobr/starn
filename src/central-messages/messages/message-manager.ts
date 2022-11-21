import type {Socket} from 'net';
import {AccumulatedMessages} from './message-store-menager';
import {SendMessage} from '../events/send-message';
import {DataStarn} from '../../data.starn';
import {ConnectedTopics} from '../connected-topics';
import {TopicErros} from '../../errors/topic.erros';

export class MessageMenager {
	private static readonly send: SendMessage = new SendMessage();
	private static readonly data: DataStarn = new DataStarn();

	connectedTopics: ConnectedTopics;
	private readonly store: AccumulatedMessages;

	// eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/parameter-properties
	topics: string[];
	// eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/parameter-properties
	key: string;

	constructor(topics: string[], key: string) {
		this.key = key;
		this.topics = topics;
		this.store = new AccumulatedMessages(topics);
		this.connectedTopics = new ConnectedTopics(topics);
	}

	messageMenager(socket: Socket): void {
		socket.on('data', data => {
			const messagesList = MessageMenager.data.toArray(data);

			for (let i = 0; i < messagesList.length - 1; i++) {
				const message = MessageMenager.data.parse(messagesList[i]);
				switch (message.messageSendindType) {
					case 'Get Topics':
						MessageMenager.send.sendEventMessage({
							topics: this.topics,
							message: '',
							time: Date.now(),
							messageSendindType: 'Get Topics',
							topic: '',
							id: message.id,
						});
						break;

					case 'Send Message':
						if (
							!this.topics.includes(message.topic)
						) {
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
								messageSendindType: 'Send Message',
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

					case 'Disconnect Topic':
						this.connectedTopics.disconnectTopic(message.topic);
						break;
					case 'List Topics':
						MessageMenager.send.sendEventMessage({
							topics: this.topics,
							time: Date.now(),
							topic: '',
							message: '',
							messageSendindType: 'List Topics',
						});
						break;
					case 'Validate Key':
						MessageMenager.send.sendEventMessage({
							time: Date.now(),
							topic: '',
							message: message.message === this.key,
							messageSendindType: 'Validate Key',
						});
						break;
					case 'Create Topic':
						if (this.topics.includes(message.topic)) {
							return new TopicErros(`the topic ${message.topic} already exists.`);
						}

						this.topics.push(message.topic);
						this.connectedTopics.topicsConnected.push({
							topic: message.topic,
							connected: 0,
						});

						break;
					case 'Remove Topic':
						if (!this.topics.includes(message.topic)) {
							return new TopicErros(`topic ${message.topic} is not valid.`);
						}

						this.topics.splice(this.topics.indexOf(message.topic), this.topics.indexOf(message.topic));
						this.connectedTopics.topicsConnected.splice(this.topics.indexOf(message.topic), this.topics.indexOf(message.topic));
						break;
					default:
						break;
				}
			}
		});
	}
}
