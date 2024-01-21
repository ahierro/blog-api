import { ApiProperty } from "@nestjs/swagger";

export class Token{
    @ApiProperty({ name: 'access_token', description: 'JWT token' })
    access_token: string;
}