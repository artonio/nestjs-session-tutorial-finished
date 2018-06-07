import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectEntity} from './project.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity])],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule {}
