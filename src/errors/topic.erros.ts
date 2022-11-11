import { Errors } from "./erros";

export class TopicErros {
    constructor(topic: string) {
        const message = `topic ${topic} is not valid.`;
        
        throw new Errors("TopicError: ", message);
    }
}