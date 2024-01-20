import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type USerDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ type: String, required: true, index: true, unique: true })
    username: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: Boolean, required: true })
    isAdmin: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);