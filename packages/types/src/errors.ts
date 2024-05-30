export class EDatabaseError extends Error {
  statusCode = 500;
  constructor(message: string) {
    super(message);
    this.name = "EDatabaseError";
  }
}

export class EApiError extends Error {
  readonly code;
  readonly statusCode;
  constructor({
    message,
    code,
    statusCode,
  }: {
    message: string;
    code: string;
    statusCode: number;
  }) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}
