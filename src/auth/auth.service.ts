import { Injectable } from '@nestjs/common';
import {UserEntity} from '../user/user.entity';

@Injectable()
export class AuthService {
    async validateUser(user: {username: string, password: string}): Promise<any> {
        return await UserEntity.authenticateUser(user);
    }
}
