import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {HttpStrategy} from './http.strategy';
import {AppAuthGuard} from './AppAuthGuard';
import {CookieSerializer} from './cookie-serializer';

@Module({
  providers: [AuthService, HttpStrategy, AppAuthGuard, CookieSerializer]
})
export class AuthModule {}
