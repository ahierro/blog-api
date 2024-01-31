import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminService {

  constructor(private readonly userService: UserService) {}

  findAll() {
    return this.userService.findAll();
  }

  remove(id: string) {
    return this.userService.remove(id);
  }
}
