import {Errors} from './erros';

export class TypesErros {
	message: string;

	constructor(message: string, type: string) {
		this.message = `type of ${message} is different ${type}.`;

		throw new Errors('TypeError: ', this.message);
	}
}
