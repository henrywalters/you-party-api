import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Session } from "src/entities/session.entity";
import { Request } from 'express';

@Injectable()
export class PartyAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const token = req.headers["party-token"];

        console.log(req.headers);

        if (!token) {
            return false;
        }

        const session = await Session.findOne({
            where: {
                token,
            }
        });

        return session && session.active;

    }
}