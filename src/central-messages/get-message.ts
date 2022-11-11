import type {EventEmitter} from 'events';
import {on} from 'events';
import type {Socket} from 'net';

export class GetMessage {
	// eslint-disable-next-line @typescript-eslint/parameter-properties
	event: EventEmitter;

	constructor(event: EventEmitter) {
		this.event = event;
	}

	async getEventMessage(socket: Socket) {
		for await (const message of on(this.event, 'message')) {
			socket.write(message[0]);
		}
	}
}
