import type {Params} from './standard-params';

export type ParametersStarn = {
	topics: string[];
	key?: string;
} & Params;
