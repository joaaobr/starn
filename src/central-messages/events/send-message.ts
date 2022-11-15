import {EventEmitter} from 'events';
import type {DataSender} from '../../types/data-sender';

export class SendMessage {
	private static readonly event: EventEmitter = new EventEmitter();

	sendEventMessage(message: DataSender): void {
		process.nextTick(() => {
			if (typeof message.message === 'string') {
				message.message = Buffer.from(message.message);
				message.messageState = 'string';
			}

			SendMessage.event.emit('message', JSON.stringify(message).concat('\n'));
		});
	}

	getEvent() {
		return SendMessage.event;
	}
}
