import {Body, Controller, Get, HttpStatus, Post, Res, UseGuards} from '@nestjs/common';
import {SessionGuard} from '../auth/SessionGuard';
import {SessionUser} from '../user/user.decorator';
import {UserEntity} from '../user/user.entity';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {CreateProjectDto} from './models/CreateProjectDto';
import {ProjectService} from './project.service';
import {ProjectEntity} from './project.entity';

@ApiUseTags('project')
@Controller('project')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) {}

    @Get('')
    @UseGuards(SessionGuard)
    @ApiOperation({title: 'Get Projects for User'})
    public async getProjects(@Res() res, @SessionUser() user: UserEntity) {
        const projects: ProjectEntity[] = await this.projectService.getProjectsForUser(user);
        return res.status(HttpStatus.OK).send(projects);
    }

    @Post('')
    @UseGuards(SessionGuard)
    @ApiOperation({title: 'Create a project for the logged in user'})
    public async createProject(@Body() createProjects: CreateProjectDto[], @Res() res, @SessionUser() user: UserEntity) {
        const projects: ProjectEntity[] = await this.projectService.createProject(createProjects, user);
        return res.status(HttpStatus.OK).send(projects);
    }

}
