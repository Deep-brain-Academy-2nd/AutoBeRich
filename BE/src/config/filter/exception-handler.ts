import { ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import { Response } from "express";

export class ETException extends HttpException {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message?: string) {
        super(message, statusCode);
        this.statusCode = statusCode;
        this.message = message;
    }
}

@Catch(ETException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: ETException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        exception.message && console.error(exception.stack);
        exception.message
            ? response.status(status).send(exception.message)
            : response.sendStatus(status);
    }
}