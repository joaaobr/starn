import {DataStarn} from '../data.starn';
import type {ArrayMessage} from '../types/array-message';
import type {Message} from '../types/message';

export class MakeMessage {
	private static readonly data: DataStarn = new DataStarn();

	makeMessage(topic: string, data: Message | ArrayMessage): string {
		return JSON.stringify({
			topic,
			messageSendindType: 'Send Message',
			time: Date.now(),
			message: data,
		}).concat('\n');
	}
}
