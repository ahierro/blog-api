import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor() { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return context.switchToHttp().getRequest().user.isAdmin;
    }
}
