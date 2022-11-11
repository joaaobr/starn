import { TypesErros } from "./errors/data.erros"

export class DataStarn {
    typesEquals(data: any, type: string) {
        if(typeof(data) != type) {
            return new TypesErros(data, type);
        }
    }

    stringToArray(data: Buffer) {
        return data
        .toString()
        .split('\n')
    }
}