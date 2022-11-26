import {EventEmitter} from 'events';
import type {DataSender} from '../../types/data-sender';

export class SendMessage {
	private static readonly event: EventEmitter = new EventEmitter();

	sendEventMessage(dataToBeSent: DataSender | string): void {
		process.nextTick(() => {
			if (typeof dataToBeSent !== 'string') {
				if (typeof dataToBeSent.message === 'string') {
					dataToBeSent.message = Buffer.from(dataToBeSent.message, 'utf-8');
					dataToBeSent.messageState = 'string';
				}

				dataToBeSent = JSON.stringify(dataToBeSent).concat('\n');
			}

			SendMessage.event.emit('message', dataToBeSent);
		});
	}

	getEvent() {
		return SendMessage.event;
	}
}
