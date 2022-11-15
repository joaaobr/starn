import type {DataSender} from '../../types/data-sender';
import type {MessageStore} from '../../types/message-store';

export class AccumulatedMessages {
	accumulatedMessages: MessageStore[] = [];
	allAccumulatedMessages: MessageStore[] = [];

	constructor(topics: string[]) {
		for (const topic of topics) {
			this.accumulatedMessages.push({
				topic,
				messages: [],
			});
		}

		this.allAccumulatedMessages = this.accumulatedMessages;
	}

	addMessage(topic: string, message: DataSender) {
		for (const topicInAccumulatedMessages of this.accumulatedMessages) {
			if (topicInAccumulatedMessages.topic === topic) {
				topicInAccumulatedMessages.messages.push(message);
			}
		}

		this.allAccumulatedMessages = this.accumulatedMessages;
	}

	removeMessagesFrom(topic: string) {
		for (const tcp of this.accumulatedMessages) {
			if (tcp.topic === topic) {
				tcp.messages = [];
			}
		}
	}

	receiveMessageFrom(topic: string) {
		for (const tcp of this.accumulatedMessages) {
			if (tcp.topic === topic) {
				return tcp.messages;
			}
		}

		return [];
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