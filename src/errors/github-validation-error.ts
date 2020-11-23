import { CustomError } from './custom-error';

interface IGithubValidationError {
  message: string;
  errors: { field: string, resource: string, code: string }[];
  documentation_url: string;
}

export class GithubError extends CustomError {
  statusCode: number = 400;

  constructor(public err: IGithubValidationError) {
    super('Github Error');

    Object.setPrototypeOf(this, GithubError.prototype);
  }

  public serializeError() {
    return this.err.errors.map(e => {
      return { message: this.err.message, field: `Field ${e.field}, with code ${e.code}, related to resource ${e.resource}` };
    });
  }
}