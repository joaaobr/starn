import { Errors } from "./erros";

export class TypesErros {
    constructor(data: any, type: string) {
        const message = `type of ${data} is different ${type}.`

        throw new Errors("TypeError: ", message);
    }
}
