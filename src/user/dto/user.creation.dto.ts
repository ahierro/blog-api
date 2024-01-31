import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty } from "class-validator";
import { IUser } from "../../auth/types/IUser";

export class UserCreationDto implements IUser {
    @ApiProperty({ name: 'username', description: 'User name', required: true })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ name: 'password', description: 'User password', required: true })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ name: 'isAdmin', description: 'If true, it has access to admin endpoints', required: true })
    @IsDefined()
    isAdmin: boolean;
}
