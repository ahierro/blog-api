import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { UserDto } from 'src/user/dto/user.dto';
import { BadRequestDTO } from 'src/shared/dto/BadRequest.dto';
import { MongoIdPipe } from 'src/shared/pipes/MongoIdPipe';

@ApiTags('Administration')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
}
