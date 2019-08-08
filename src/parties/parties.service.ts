import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { CreateParty, GenResSingle, IParty, GenResFactory, JoinParty, IGuest, GenRes } from "you-party-shared";
import { Party } from "src/entities/party.entity";
import { Random } from "src/utilities/random";
import { Words } from "src/utilities/words";
import { Guest } from "src/entities/guest.entity";
import { Session } from "src/entities/session.entity";

const PARTY_KEY_LENGTH = 5;
const MAX_GUEST_DURATION = 24 * 3600 * 1000;

@Injectable()
export class PartyService {
    constructor(private readonly words: Words) {}

    public async createParty(request: CreateParty): Promise<IParty> {
        const party = new Party();
        party.name = request.name && request.name.length > 0 ? request.name : this.words.randomFunnySentence;
        
        let exists: boolean = true;
        let key: string = "";

        // Make sure no parties exist with the given key.
        while (exists) {
            key = Random.AlphaNumeric(PARTY_KEY_LENGTH);

            const existingParties = Party.find({
                where: {
                    key,
                }
            });

            if (!existingParties) {
                exists = false;
                party.key = key;
            }
        }

        await party.save();

        return party;
    }

    public async joinParty(request: JoinParty): Promise<Session> {

        let party: undefined | Party = undefined;

        if (request.id) {
            party = await Party.findOne(request.id);
        } else if (request.key) {
            party = await Party.findOne({
                where: {
                    key: request.key
                }
            })
        } else {
            throw new BadRequestException("Missing parameters: id or key");
        }

        if (!party) {
            throw new NotFoundException("Failed to find Party");
        } 

        const guest = new Guest();
        const session = new Session();

        guest.party = party;

        const now = new Date();

        guest.nickname = this.words.randomFunnyNoun;

        session.expires = new Date();
        session.expires.setMilliseconds(now.getMilliseconds() + MAX_GUEST_DURATION);
        session.token = Random.AlphaNumeric(30);

        session.issued = now;
        session.lastRefresh = now;
    
        await guest.save();
        session.guest = guest;

        await session.save();

        return session;
    }
}