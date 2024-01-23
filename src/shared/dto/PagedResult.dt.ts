import { ApiProperty } from "@nestjs/swagger";

export class PagedResultDTO<T> {

    constructor(totalElements: number, totalPages: number, content: [T]) {
        this.content = content;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    @ApiProperty({ name: 'content', description: 'Content results'})
    content: [T];
    @ApiProperty({ name: 'totalElements', description: 'Total Elements' })
    totalElements: number;
    @ApiProperty({ name: 'totalPages', description: 'Total Pages' })
    totalPages: number;
}
