import { Injectable } from '@nestjs/common';
import {IProjectService} from './IProjectService';
import {CreateProjectDto} from './models/CreateProjectDto';
import {UserEntity} from '../user/user.entity';
import {ProjectEntity} from './project.entity';

@Injectable()
export class ProjectService implements IProjectService{

    public async createProject(projects: CreateProjectDto[], user: UserEntity): Promise<ProjectEntity[]> {
        return ProjectEntity.createProjects(projects, user);
    }

    public async getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]> {
        return ProjectEntity.getProjects(user);
    }
}
