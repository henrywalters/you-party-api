import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { GenRes, GenResFactory, IParty } from "you-party-shared";
import { Session } from "src/entities/session.entity";

@Injectable()
export class GuestService {
    public async refreshToken(token: string): Promise<Session> {
        const session = await Session.findOne({
            where: {
                token,
            }
        });

        if (!session) {
            throw new NotFoundException("No session found");
        }

        const successfulRefresh = await session.refresh();

        if (successfulRefresh) {
            return session;
        } else {
            throw new UnauthorizedException("Session Expired");
        }
    }

    public async getCurrentParty(token: string): Promise<IParty> {
        const session = await Session.findOne({
            where: {
                token,
            }
        });

        if (!session) {
            throw new UnauthorizedException("Not in party");
        }

        return session.guest.party;
    }
}