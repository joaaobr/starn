import {EventEmitter} from 'events';

export class SendMessage {
	private static readonly event: EventEmitter = new EventEmitter();

	sendEventMessage(message: Record<string, unknown>): void {
		process.nextTick(() =>
			SendMessage.event.emit('message', JSON.stringify(message).concat('\n')),
		);
	}

	getEvent() {
		return SendMessage.event;
	}
}
