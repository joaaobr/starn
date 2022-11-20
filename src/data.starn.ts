import {TypesErros} from './errors/data.erros';
import type {DataSender} from './types/data-sender';

export class DataStarn {
	typesAreEquals(data: any, type: string) {
		if (typeof data !== type) {
			return new TypesErros(data, type);
		}
	}

	toArray(data: Buffer) {
		return data.toString().split('\n');
	}

	parse(data: string): DataSender {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return JSON.parse(data);
	}
}
