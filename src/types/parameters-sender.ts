import type {Params} from './standard-params';

export type ParametersSender = {
	typeMessage?: 'string' | 'array' | 'object' | 'buffer';
} & Params;
