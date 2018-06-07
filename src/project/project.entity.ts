import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from '../user/user.entity';
import {AppError} from '../common/error/AppError';
import {AppErrorTypeEnum} from '../common/error/AppErrorTypeEnum';
import {CreateProjectDto} from './models/CreateProjectDto';

@Entity({name: 'projects'})
export class ProjectEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    public static async createProjects(projects: CreateProjectDto[], user: UserEntity): Promise<ProjectEntity[]> {
        const u: UserEntity = await UserEntity.findOne(user.id);
        if (!u) throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        const projectEntities: ProjectEntity[] = [];
        projects.forEach((p: CreateProjectDto) => {
            const pr: ProjectEntity = new ProjectEntity();
            pr.name = p.name;
            pr.description = p.description;
            projectEntities.push(pr);
        });
        u.projects = projectEntities;
        const result: ProjectEntity[] = await ProjectEntity.save(projectEntities);
        await UserEntity.save([u]);
        return Promise.all(result);
    }

    public static async getProjects(user: UserEntity): Promise<ProjectEntity[]> {
        const u: UserEntity = await UserEntity.findOne(user.id, { relations: ['projects']});
        if (!u) throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        return Promise.all(u.projects);
    }
}
