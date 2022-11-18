import {EventEmitter} from 'events';
import type {DataSender} from '../../types/data-sender';

export class SendMessage {
	private static readonly event: EventEmitter = new EventEmitter();

	sendEventMessage(message: DataSender | string): void {
		process.nextTick(() => {
			if (typeof message !== 'string') {
				if (typeof message.message === 'string') {
					message.message = Buffer.from(message.message, 'utf-8');
					message.messageState = 'string';
				}

				message = JSON.stringify(message).concat('\n');
			}

			SendMessage.event.emit('message', message);
		});
	}

	getEvent() {
		return SendMessage.event;
	}
}
