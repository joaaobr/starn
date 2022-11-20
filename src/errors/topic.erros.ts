import {Errors} from './erros';

export class TopicErros {
	message: string;

	constructor(message: string) {
		this.message = message || 'There was some error';

		throw new Errors('TopicError: ', this.message);
	}
}
