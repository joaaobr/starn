import {EventEmitter} from 'events';
import type {DataSender} from '../../types/data-sender';

export class SendMessage {
	private static readonly event: EventEmitter = new EventEmitter();

	sendEventMessage(data: DataSender | string): void {
		process.nextTick(() => {
			if (typeof data !== 'string') {
				if (typeof data.message === 'string') {
					data.message = Buffer.from(data.message, 'utf-8');
					data.messageState = 'string';
				}

				data = JSON.stringify(data).concat('\n');
			}

			SendMessage.event.emit('message', data);
		});
	}

	getEvent() {
		return SendMessage.event;
	}
}
