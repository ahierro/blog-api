import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../types/Payload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "S3Cr3t"
        });
    }

    validate(payload: Payload) {
        console.log("JwtStrategy#validate payload:", payload)
        return { userId: payload.sub, username: payload.username, isdAdmin: payload.admin };
    }
}