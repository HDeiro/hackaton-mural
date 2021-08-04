import { Response } from "express";

export class ErrorService {
  public static readonly BAD_REQUEST_ERROR = 400;
  public static readonly UNEXPECTED_ERROR = 500;

  public static errorHandler(error: Error, response: Response) {
    if (error instanceof ValidationError) {
      console.info(`ValidationError - ${error}`);

      // Bad Request
      response.status(this.BAD_REQUEST_ERROR).json({
        message: error.message || "ValidationError",
        status: this.BAD_REQUEST_ERROR,
      });
    } else {
      console.info(`An unexpected Error occured - ${error}`);

      // Unexpected Error
      response.status(this.UNEXPECTED_ERROR).json({
        message: error.message || "Unexpected Error",
        status: this.UNEXPECTED_ERROR,
      });
    }
  }
}

export class ValidationError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(...args: any) {
    super(...args);
  }
}
