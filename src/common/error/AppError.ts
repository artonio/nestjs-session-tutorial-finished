import {AppErrorTypeEnum} from './AppErrorTypeEnum';
import {IErrorMessage} from './IErrorMessage';
import {HttpStatus} from '@nestjs/common';

export class AppError extends Error {

    public errorCode: AppErrorTypeEnum;
    public httpStatus: number;
    public errorMessage: string;
    public userMessage: string;

    constructor(errorCode: AppErrorTypeEnum) {
        super();
        const errorMessageConfig: IErrorMessage = this.getError(errorCode);
        if (!errorMessageConfig) throw new Error('Unable to find message code error.');

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.httpStatus = errorMessageConfig.httpStatus;
        this.errorCode = errorCode;
        this.errorMessage = errorMessageConfig.errorMessage;
        this.userMessage = errorMessageConfig.userMessage;
    }

    private getError(errorCode: AppErrorTypeEnum): IErrorMessage {

        let res: IErrorMessage;

        switch (errorCode) {
            case AppErrorTypeEnum.USER_NOT_FOUND:
                res = {
                    type: AppErrorTypeEnum.USER_NOT_FOUND,
                    httpStatus: HttpStatus.NOT_FOUND,
                    errorMessage: 'User not found',
                    userMessage: 'Unable to find the user with the provided information.'
                };
                break;
            case AppErrorTypeEnum.USER_EXISTS:
                res = {
                    type: AppErrorTypeEnum.USER_EXISTS,
                    httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
                    errorMessage: 'User exisists',
                    userMessage: 'Username exists'
                };
                break;
            case AppErrorTypeEnum.NOT_IN_SESSION:
                res = {
                    type: AppErrorTypeEnum.NOT_IN_SESSION,
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    errorMessage: 'No Session',
                    userMessage: 'Session Expired'
                };
                break;
            case AppErrorTypeEnum.NO_USERS_IN_DB:
                res = {
                    type: AppErrorTypeEnum.NO_USERS_IN_DB,
                    httpStatus: HttpStatus.NOT_FOUND,
                    errorMessage: 'No Users exits in the database',
                    userMessage: 'No Users. Create some.'
                };
                break;
            case AppErrorTypeEnum.WRONG_PASSWORD:
                res = {
                    type: AppErrorTypeEnum.WRONG_PASSWORD,
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    errorMessage: 'Wrong password',
                    userMessage: 'Password does not match'
                };
                break;
        }
        return res;
    }

}
