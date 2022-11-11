export class Errors extends Error {
    foo?: string;

    constructor(typeError: string, message: string, foo?: string, ...params: any) {

      super(...params);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Errors);
      }
  
      this.name = typeError.concat(message);

    
      if(foo) this.foo = foo;
    }
}