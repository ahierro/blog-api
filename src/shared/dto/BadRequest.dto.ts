import { ApiProperty } from "@nestjs/swagger";

export class BadRequestDTO {
    @ApiProperty({ name: 'message', description: 'Error Description' })
    message: string[];
    @ApiProperty({ name: 'error', description: 'Status Code Description' })
    error: string;
    @ApiProperty({ name: 'statusCode', description: 'HTTO status code' })
    statusCode: number;
}
