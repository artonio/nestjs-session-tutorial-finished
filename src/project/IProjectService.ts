import {CreateProjectDto} from './models/CreateProjectDto';
import {UserEntity} from '../user/user.entity';
import {ProjectEntity} from './project.entity';

export interface IProjectService {
    createProject(projects: CreateProjectDto[], user: UserEntity): Promise<ProjectEntity[]>;
    getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;

}
