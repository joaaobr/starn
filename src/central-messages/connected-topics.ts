import type {Connected} from '../types/connected-topics';

export class ConnectedTopics {
	topicsConnected: Connected[];

	constructor(topics: string[]) {
		this.topicsConnected = [];
		for (const topic of topics) {
			this.topicsConnected.push({topic, connected: 0});
		}
	}

	topicIsConnected(topic: string): boolean {
		for (const data of this.topicsConnected) {
			if (data.topic === topic) {
				return Boolean(data.connected);
			}
		}

		return false;
	}

	addTopicConnected(topic: string): void {
		for (const data of this.topicsConnected) {
			if (data.topic === topic) {
				data.connected = 1;
			}
		}
	}

	disconnectTopic(topic: string) {
		for (const data of this.topicsConnected) {
			if (data.topic === topic) {
				data.connected = 0;
			}
		}
	}
}
