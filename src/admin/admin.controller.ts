import { Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { UserDto } from '../user/dto/user.dto';
import { BadRequestDTO } from '../shared/dto/BadRequest.dto';
import { MongoIdPipe } from '../shared/pipes/MongoIdPipe';
import { PagedPostDTO } from '../post/dto/PagedPost.dto';
import { PostService } from './../post/post.service';

@ApiTags('Administration')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiBearerAuth()
  @Get('/users')
  @ApiOperation({ summary: 'Retrieve all users. (only for admins)' })
  @ApiResponse({ status: 200, description: 'Users returned successfully', type: [UserDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiBearerAuth()
  @Delete('/users/:id')
  @ApiOperation({ summary: 'Remove user. (only for admins)' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'The user does not exist.' })
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.adminService.remove(id);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiBearerAuth()
  @Get("/posts")
  @ApiOperation({ summary: 'Retrieve all posts.' })
  @ApiQuery({ name: 'page', required: false, description: 'The page of results to retrieve. The first one is 1. Default to 1.', type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, description: 'The number of results to retrieve. Default to 10', type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Posts returned successfully', type: PagedPostDTO })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAllPost(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number) {
    return await this.postService.search({ page, size });
  }
}
