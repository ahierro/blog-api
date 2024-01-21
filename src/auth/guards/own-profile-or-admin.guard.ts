import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OwnProfileOrAdmin implements CanActivate {
    constructor() { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return context.switchToHttp().getRequest().user.isAdmin || 
        (context.switchToHttp().getRequest().user.username == context.switchToHttp().getRequest().body.username && !context.switchToHttp().getRequest().body.isAdmin);
    }
}
