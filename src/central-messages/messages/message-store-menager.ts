import {DataStarn} from '../../data.starn';
import type {DataSender} from '../../types/data-sender';
import type {MessageStore} from '../../types/message-store';

export class AccumulatedMessages {
	private static readonly data: DataStarn = new DataStarn();
	accumulatedMessages: MessageStore[] = [];
	allAccumulatedMessages: MessageStore[] = [];

	constructor(topics: string[]) {
		for (const topic of topics) {
			this.accumulatedMessages.push({
				topic,
				messages: '',
			});
		}

		this.allAccumulatedMessages = this.accumulatedMessages;
	}

	addMessage(topic: string, data: DataSender) {
		if (typeof data.message === 'string') {
			data.message = Buffer.from(data.message, 'utf-8');
			data.messageState = 'string';
		}

		for (const topicInAccumulatedMessages of this.accumulatedMessages) {
			if (topicInAccumulatedMessages.topic === topic) {
				topicInAccumulatedMessages.messages += JSON.stringify(data) + '\n';
			}
		}

		this.allAccumulatedMessages = this.accumulatedMessages;
	}

	removeMessagesFrom(topic: string) {
		for (const tcp of this.accumulatedMessages) {
			if (tcp.topic === topic) {
				tcp.messages = '';
			}
		}
	}

	receiveMessageFrom(topic: string): string {
		for (const tcp of this.accumulatedMessages) {
			if (tcp.topic === topic) {
				return tcp.messages;
			}
		}

		return '';
	}

	theTopicHasMessagesStored(topic: string): boolean {
		for (const tcp of this.accumulatedMessages) {
			if (tcp.topic === topic) {
				return Boolean(tcp.messages);
			}
		}

		return false;
	}
}
