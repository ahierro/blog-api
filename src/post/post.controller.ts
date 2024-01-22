import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards,Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BadRequestDTO } from 'src/shared/dto/BadRequest.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new post. (only for registered users)', description: 'Saves the post in the database.' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: PostDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 409, description: 'The post already exists.' })
  create(@Body() createPostDto: CreatePostDto,@Request() req) {
    return this.postService.create(createPostDto,req.user);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Retrieve al posts from a specific author' })
  @ApiResponse({ status: 200, description: 'The posts have been successfully retrieved.', type: [PostDto] })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 404, description: 'The post does not exist.' })
  findOneByAuthor(@Param('userId') userId: string) {
    return this.postService.findAllByAuthor(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all posts.' })
  @ApiResponse({ status: 200, description: 'Posts returned successfully', type: [PostDto] })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single post.' })
  @ApiResponse({ status: 200, description: 'The post has been successfully retrieved.', type: PostDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 404, description: 'The post does not exist.' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a single post.(only for admins or own posts)' })
  @ApiResponse({ status: 200, description: 'The post has been successfully updated.', type: PostDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'The post does not exist.' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto,@Request() req) {
    return this.postService.update(id, updatePostDto,req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single post. (only for admins or own posts)' })
  @ApiResponse({ status: 200, description: 'The post has been successfully deleted.', type: PostDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'The post does not exist.' })
  remove(@Param('id') id: string,@Request() req) {
    return this.postService.remove(id,req.user);
  }


}
