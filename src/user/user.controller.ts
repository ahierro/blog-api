import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreationDto } from './dto/user.creation.dto';
import { MongoExceptionFilter } from '../shared/exception-filters/MongoExceptionFilter';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { MongoIdPipe } from 'src/shared/pipes/MongoIdPipe';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseFilters(MongoExceptionFilter)
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'The record already exists.' })
  async create(@Body() createUserDto: UserCreationDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users.' })
  @ApiResponse({ status: 200, description: 'Users returned successfully', type: [UserDto] })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single user.' })
  @ApiResponse({ status: 200, description: 'The record has been successfully retrieved.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'The record does not exist.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The unique identifier of the user on mongo ObjectId format.'
  })
  async findOne(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a single user.' })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'The record does not exist.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The unique identifier of the user on mongo ObjectId format.'
  })
  async update(@Param('id', MongoIdPipe) id: string, @Body() updateUserDto: UserCreationDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single user.' })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'The record does not exist.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The unique identifier of the user on mongo ObjectId format.'
  })
  async remove(@Param('id', MongoIdPipe) id: string) {
    return this.userService.remove(id);
  }
}
