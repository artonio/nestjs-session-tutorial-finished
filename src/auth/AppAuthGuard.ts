import {CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import * as passport from 'passport';

export class AppAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const options = { ...defaultOptions };
        const httpContext = context.switchToHttp();
        const [request, response] = [
            httpContext.getRequest(),
            httpContext.getResponse()
        ];
        const passportFn = createPassportContext(request, response);

        const user = await passportFn(
            'bearer',
            options
        );
        if (user) {
            request.login(user, (res) => {});
        }

        return true;
    }

}

const createPassportContext = (request, response) => (type, options) =>
    new Promise((resolve, reject) =>
        passport.authenticate(type, options, (err, user, info) => {
            try {
                return resolve(options.callback(err, user, info));
            } catch (err) {
                reject(err);
            }
        })(request, response, resolve)
    );

const defaultOptions = {
    session: true,
    property: 'user',
    callback: (err, user, info) => {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
};
