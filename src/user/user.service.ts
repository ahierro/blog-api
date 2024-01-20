import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { UserCreationDto as UserCreationDto } from './dto/user.creation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: UserCreationDto) {
    const userCreated = await this.userModel.create(createUserDto);
    return { ...userCreated.toJSON(), password: undefined };
  }

  async findAll() {
    return this.userModel.find().select("-password").lean();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).select("-password").lean();
  }

  async update(id: string, updateUserDto: UserCreationDto) {
    return this.userModel.findByIdAndUpdate(id, { ...updateUserDto, $inc: { __v: 1 } }, { new: true }).select("-password").lean();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).select("-password").lean();
  }

}
