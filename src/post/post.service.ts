import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { UserJwt } from 'src/shared/interfaces/UserJwt';

@Injectable()
export class PostService {

  constructor(@InjectModel(Post.name) private postModel: Model<Post>) { }

  create(createPostDto: CreatePostDto, user: UserJwt) {
    return this.postModel.create({ ...createPostDto, author: user.userId });
  }

  findAll() {
    return this.postModel.find().lean();
  }
  search(filters: any) {
    const query: any = {};
    if (filters.category) {
      query.categories = filters.category;
    }
    if (filters.author) {
      query.author = filters.author;
    }
    if (filters.title) {
      query.title = filters.title;
    }
    if (filters.content) {
      query.content = filters.content;
    }
    return this.postModel.find(query).lean();
  }
  findOne(id: string) {
    return this.postModel.findById(id).lean();
  }

  update(id: string, updatePostDto: UpdatePostDto, user: UserJwt) {
    return this.postModel.findOneAndUpdate((user.isAdmin) ? { _id: id} : { _id: id,author:user.userId}, { ...updatePostDto, $inc: { __v: 1 } }, { new: true }).lean();
  }

  remove(id: string, user: UserJwt) {
    return this.postModel.findOneAndDelete((user.isAdmin) ? { _id: id} : { _id: id,author:user.userId}).lean();
  }

  findAllByAuthor(userId: string) {
    return this.postModel.find({author:userId}).lean();
  }

}
