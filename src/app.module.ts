import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import {UserEntity} from './user/user.entity';
import {ProjectEntity} from './project/project.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'sqlite',
          database: `${process.cwd()}/tutorial.sqlite`,
          entities: [UserEntity, ProjectEntity],
          synchronize: true,
          // logging: 'all'
      }),
      UserModule,
      ProjectModule,
      AuthModule,
  ],
  controllers: [AppController],
  providers: [ AppService ],
})
export class AppModule {}
