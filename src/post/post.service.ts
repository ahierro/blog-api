import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { UserJwt } from '../shared/interfaces/UserJwt';
import { PagedResultDTO } from '../shared/dto/PagedResult.dt';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(@InjectModel(Post.name) private postModel: Model<Post>) { }

  create(createPostDto: CreatePostDto, user: UserJwt) {
    return this.postModel.create({ ...createPostDto, author: user.userId });
  }

  findAll() {
    return this.postModel.find().lean();
  }
  async search(filters: any) {
    this.logger.log('search:',filters);

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
    if(filters.page<1){
      throw new BadRequestException('Page cannot be 0 or negative. The first page is 1.');
    }
    if(filters.size<1){
      throw new BadRequestException('Size cannot be 0 or negative');
    }
    const count = await this.postModel.countDocuments(query);
    const content: [PostDto] = await this.postModel.find(query).sort({ _id: 1 }).skip((filters.page-1)*filters.size).limit(filters.size).lean();
    const totalPages = Math.ceil(count / filters.size );
    return new PagedResultDTO<PostDto>(count,totalPages, content);
  }
  findOne(id: string) {
    return this.postModel.findById(id).lean();
  }

  update(id: string, updatePostDto: UpdatePostDto, user: UserJwt) {
    return this.postModel.findOneAndUpdate((user.isAdmin) ? { _id: id } : { _id: id, author: user.userId }, { ...updatePostDto, $inc: { __v: 1 } }, { new: true }).lean();
  }

  remove(id: string, user: UserJwt) {
    return this.postModel.findOneAndDelete((user.isAdmin) ? { _id: id } : { _id: id, author: user.userId }).lean();
  }

  findAllByAuthor(userId: string) {
    return this.postModel.find({ author: userId }).lean();
  }

}
