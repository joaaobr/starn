import type {Message} from '../types/message';
import {Errors} from './erros';

export class TypesErros {
	message: string;

	constructor(data: string, type: string) {
		this.message = `type of ${data} is different ${type}.`;

		throw new Errors('TypeError: ', this.message);
	}
}
