import { ApiProperty } from "@nestjs/swagger";

export class PostDto {
    @ApiProperty({ name: '_id', description: 'User Id' })
    _id: string;
    @ApiProperty({ name: 'title', description: 'Title' })
    title: string;
    @ApiProperty({ name: 'author', description: 'Author' })
    author: string;
    @ApiProperty({ name: 'content', description: 'Content' })
    content: string;
    @ApiProperty({ name: 'categories', description: 'Categories' })
    categories: string[];
    @ApiProperty({ name: '__v', description: 'Version' })
    __v: number;
}
