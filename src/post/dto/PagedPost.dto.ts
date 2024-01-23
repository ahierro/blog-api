import { ApiProperty } from "@nestjs/swagger";
import { PostDto } from "./post.dto";

export class PagedPostDTO {
    @ApiProperty({ name: 'content', description: 'Content results', type: [PostDto] })
    content: [PostDto];
    @ApiProperty({ name: 'totalElements', description: 'Total Elements' })
    totalElements: number;
    @ApiProperty({ name: 'totalPages', description: 'Total Pages' })
    totalPages: number;
}