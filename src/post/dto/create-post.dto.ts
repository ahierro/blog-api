import { ApiProperty } from "@nestjs/swagger";
export class CreatePostDto {
    @ApiProperty({ name: 'title', description: 'Title' })
    title: string;
    @ApiProperty({ name: 'content', description: 'Content' })
    content: string;
    @ApiProperty({ name: 'categories', description: 'Categories' })
    categories: string[];
}
