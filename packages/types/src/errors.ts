export class EResourceNotFoundError extends Error {
  statusCode = 404;
  constructor(resource: string, id: string) {
    super(`${resource} with ID ${id} not found`);
    this.name = "EResourceNotFoundError";
  }
}

export class EInvalidInputError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "EInvalidInputError";
  }
}

export class EValidationError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = "EValidationError";
  }
}

export class EUnknownError extends Error {
  statusCode = 500;
  constructor(message: string) {
    super(message);
    this.name = "EUnknownError";
  }
}

export class EDatabaseError extends Error {
  statusCode = 500;
  constructor(message: string) {
    super(message);
    this.name = "EDatabaseError";
  }
}

export class EAuthenticationError extends Error {
  statusCode = 401;
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class EAuthorizationError extends Error {
  statusCode = 403;
  constructor(message: string) {
    super(message);
    this.name = "EAuthorizationError";
  }
}
