import type {Connected} from '../types/connected-topics';

export class ConnectedTopics {
	topicsConnected: Connected[] = [];

	constructor(topics: string[]) {
		this.topicsConnected = [];
		for (const topic of topics) {
			this.topicsConnected.push({topic, connected: 0});
		}
	}

	addTopicConnected(topic: string): void {
		for (const tcp of this.topicsConnected) {
			if (tcp.topic === topic) {
				tcp.connected = 1;
			}
		}
	}
}
