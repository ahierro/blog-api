import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards, Request, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreationDto } from './dto/user.creation.dto';
import { MongoExceptionFilter } from '../shared/exception-filters/MongoExceptionFilter';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { MongoIdPipe } from 'src/shared/pipes/MongoIdPipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from './../auth/auth.service';
import { UserLoginDto } from './dto/user.login.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { OwnProfileOrAdmin } from 'src/auth/guards/own-profile-or-admin.guard';
import { Token } from './dto/token.dto';
import { BadRequestDTO } from 'src/shared/dto/BadRequest.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login.', description: 'Receives username and password and compares the password to the one in the database. If it matches then it will return the JWT token.' })
  @ApiResponse({ status: 200, description: 'Login successful', type: Token })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post("/login")
  @HttpCode(200)
  async login(@Request() req, @Body() requestBody: UserLoginDto) {
    return this.authService.login(req.user);
  }

  @Post()
  @UseFilters(MongoExceptionFilter)
  @ApiOperation({ summary: 'Register a new user.', description:'Saves the user in the database and encrypts their password for security.' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 409, description: 'The user already exists.' })
  async create(@Body() createUserDto: UserCreationDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Retrieve all users.' })
  @ApiResponse({ status: 200, description: 'Users returned successfully', type: [UserDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single user.' })
  @ApiResponse({ status: 200, description: 'The user has been successfully retrieved.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 404, description: 'The user does not exist.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The unique identifier of the user on mongo ObjectId format.'
  })
  async findOne(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard,OwnProfileOrAdmin)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a single user.(only for admins or own user)', description:"Saves the user in the database and encrypts their password for security. Ensures that a user cannot change other user's passwords or elevate their own privileges to admin unless they are already an admin." })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'The user does not exist.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'The unique identifier of the user on mongo ObjectId format.'
  })
  async update(@Param('id', MongoIdPipe) id: string, @Body() updateUserDto: UserCreationDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single user. (only for admins)' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Bad request.', type: BadRequestDTO })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'The user does not exist.' })
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
