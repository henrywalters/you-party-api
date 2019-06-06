import { Injectable } from "@nestjs/common";
import { GenRes, GenResFactory, IParty } from "you-party-shared";
import { Session } from "src/entities/session.entity";

@Injectable()
export class GuestService {
    public async refreshToken(token: string): Promise<GenRes<Session>> {
        const session = await Session.findOne({
            where: {
                token,
            }
        });

        if (!session) {
            return GenResFactory.error("No session found");
        }

        const successfulRefresh = await session.refresh();

        if (successfulRefresh) {
            return GenResFactory.successfulOne(session);
        } else {
            return GenResFactory.error("Session Expired");
        }
    }

    public async getCurrentParty(token: string): Promise<GenRes<IParty>> {
        const session = await Session.findOne({
            where: {
                token,
            }
        });

        if (!session) {
            return GenResFactory.error("Not in party");
        }

        return GenResFactory.successfulOne(session.guest.party);
    }
}