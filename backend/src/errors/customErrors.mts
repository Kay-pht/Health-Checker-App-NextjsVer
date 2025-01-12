export class TokenNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenNotFoundError";
  }
}

export class ResultNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResultNotFoundError";
  }
}

export class UnauthorizedAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedAccessError";
  }
}

export class DbDataSchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbDataError";
  }
}

export class UserIdSchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "userIdError";
  }
}

export class ResultIdSchemeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "resultIdError";
  }
}

export class UserAnswerSchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "userAnswerError";
  }
}

export class ResponseNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResponseNotFoundError";
  }
}

export class ResultSchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResponseNotFoundError";
  }
}
