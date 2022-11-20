import {Starn} from '../index';

describe('is it possible to create a new Central Messages', () => {
	let starn: Starn;

	beforeAll(() => {
		starn = new Starn({
			port: 2020,
			host: 'localhost',
			topics: ['A', 'B', 'C'],
			key: 'test',
		});
	});

	it('validate if Starn properties exist', () => {
		expect(starn).toHaveProperty('port');
		expect(starn).toHaveProperty('host');
		expect(starn).toHaveProperty('socket');
		expect(starn).toHaveProperty('key');
	});

	it('validate if properties have their true values', () => {
		expect(starn.port).toStrictEqual(2020);
		expect(starn.host).toStrictEqual('localhost');
	});
});
