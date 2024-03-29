import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BadRequestDTO } from '../shared/dto/BadRequest.dto';
import { MongoIdPipe } from '../shared/pipes/MongoIdPipe';
import { PagedPostDTO } from './dto/PagedPost.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

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
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postService.create(createPostDto, req.user);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Retrieve al posts from a specific author' })
  @ApiResponse({ status: 200, description: 'The posts have been successfully retrieved.', type: [PostDto] })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 404, description: 'The post does not exist.' })
  findOneByAuthor(@Param('userId', MongoIdPipe) userId: string) {
    return this.postService.findAllByAuthor(userId);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search for posts by title or content.', description: 'It must support parameters to paginate results (the default number of results if there is no parameter will be 10).' })
  @ApiQuery({ name: 'title', required: false, description: 'The title of the post.' })
  @ApiQuery({ name: 'content', required: false, description: 'The content of the post.' })
  @ApiQuery({ name: 'page', required: false, description: 'The page of results to retrieve. The first one is 1. Default to 1.', type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, description: 'The number of results to retrieve. Default to 10', type: Number, example: 10 })

  @ApiResponse({ status: 200, description: 'The posts have been successfully retrieved.', type: PagedPostDTO })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  search(@Query('title') title: string, @Query('content') content: string, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number) {
    return this.postService.search({ title, content, page, size });
  }

  @Get('/filter')
  @ApiOperation({ summary: 'Search for posts by category or author.', description: 'Additional endpoints to filter posts by category or author.' })
  @ApiQuery({ name: 'category', required: false, description: 'The category of the post.' })
  @ApiQuery({ name: 'author', required: false, description: 'The author of the post.' })
  @ApiQuery({ name: 'page', required: false, description: 'The page of results to retrieve. The first one is 1. Default to 1.', type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, description: 'The number of results to retrieve. Default to 10', type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'The posts have been successfully retrieved.', type: PagedPostDTO })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  async filter(@Query('category') category: string, @Query('author') author: string, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number) {
    return await this.postService.search({ category, author, page, size });
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all posts.' })
  @ApiQuery({ name: 'page', required: false, description: 'The page of results to retrieve. The first one is 1. Default to 1.', type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, description: 'The number of results to retrieve. Default to 10', type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Posts returned successfully', type: PagedPostDTO })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  async findAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number) {
    return await this.postService.search({ page, size });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single post.' })
  @ApiResponse({ status: 200, description: 'The post has been successfully retrieved.', type: PostDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 404, description: 'The post does not exist.' })
  findOne(@Param('id', MongoIdPipe) id: string) {
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
  update(@Param('id', MongoIdPipe) id: string, @Body() updatePostDto: UpdatePostDto, @Request() req) {
    return this.postService.update(id, updatePostDto, req.user);
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
  remove(@Param('id', MongoIdPipe) id: string, @Request() req) {
    return this.postService.remove(id, req.user);
  }


}
