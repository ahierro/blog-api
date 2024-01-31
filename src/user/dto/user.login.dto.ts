import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserLoginDto {
    @ApiProperty({ name: 'username', description: 'User name', required: true })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ name: 'password', description: 'User password', required: true })
    @IsNotEmpty()
    password: string;
}
