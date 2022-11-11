import {Errors} from './erros';

export class TopicErros {
	message: string;

	constructor(topic: string) {
		this.message = `topic ${topic} is not valid.`;

		throw new Errors('TopicError: ', this.message);
	}
}
