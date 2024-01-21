import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/auth/types/IUser';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserCreationDto } from './dto/user.creation.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly bcryptService: BcryptService
  ) { }

  async create(createUserDto: UserCreationDto) {
    createUserDto.password = await this.bcryptService.encryptPassword(createUserDto.password);
    const userCreated = await this.userModel.create(createUserDto);
    return { ...userCreated.toJSON(), password: undefined };
  }


  async findAll() {
    return this.userModel.find().select("-password").lean();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).select("-password").lean();
  }

  async findByUserName(userName: string): Promise<IUser> {
    return this.userModel.findOne({ username: userName }).lean();
  }

  async update(id: string, updateUserDto: UserCreationDto) {
    updateUserDto.password = await this.bcryptService.encryptPassword(updateUserDto.password);
    return this.userModel.findByIdAndUpdate(id, { password:'', $inc: { __v: 1 } }, { new: true }).select("-password").lean();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).select("-password").lean();
  }

}
