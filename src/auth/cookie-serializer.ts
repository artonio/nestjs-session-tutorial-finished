import {PassportSerializer} from '@nestjs/passport/dist/passport.serializer';
import {Injectable} from '@nestjs/common';

@Injectable()
export class CookieSerializer extends PassportSerializer {
    serializeUser(user: any, done: Function): any {
        done(null, user);
    }

    deserializeUser(payload: any, done: Function): any {
        done(null, payload);
    }

}
