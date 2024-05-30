import { z, ZodIssue } from "zod";
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

export class EValidationError extends Error {
  readonly code;
  readonly statusCode;
  readonly validationErrors;

  constructor({
    message,
    code,
    statusCode,
    validationErrors,
  }: {
    message: string;
    code: string;
    statusCode: number;
    validationErrors: ZodIssue[];
  }) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.validationErrors = validationErrors;
  }
}
