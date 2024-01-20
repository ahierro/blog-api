import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({name: 'username', description: 'User id'})
  username: string;
  @ApiProperty({name: 'isAdmin', description: 'isAdmin'})
  isAdmin: boolean;
  @ApiProperty({name: '_id', description: 'User Id'})
  _id: string;
  @ApiProperty({name: '__v', description: 'Version'})
  __v: number;
}
