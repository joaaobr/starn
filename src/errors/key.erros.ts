import {Errors} from './erros';

export class KeyErros {
	message: string;

	constructor(key: string) {
		this.message = `the key ${key} is not valid.`;

		throw new Errors('KeyError: ', this.message);
	}
}
