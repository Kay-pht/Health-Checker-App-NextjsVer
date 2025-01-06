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

export class DbDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbDataError";
  }
}
