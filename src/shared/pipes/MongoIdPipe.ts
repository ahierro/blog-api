import { PipeTransform, Injectable, ArgumentMetadata, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!isValidObjectId(value)){
        throw new BadRequestException("Invalid ObjectId");
    }
    return value;
  }
}