import { Controller, Get, Post, Body, Param, Header, Req, Delete, UseGuards } from "@nestjs/common";
import { IParty, CreateParty, GenRes, GenResFactory, JoinParty, GenResSingle, IGuest } from "you-party-shared";
import { Party } from "src/entities/party.entity";
import { Words } from "src/utilities/words";
import { Random } from "src/utilities/random";
import { partition } from "rxjs";
import { Guest } from "src/entities/guest.entity";
import { Session } from "src/entities/session.entity";
import { PartyService } from "./parties.service";
import { GuestService } from "./guests.service";
import { PartyAuthGuard } from "src/guards/partyAuth.guard";
import { Request } from 'express';

@Controller("api/party")
export class PartyController {

    constructor(private readonly words: Words, private readonly partyService: PartyService, private readonly guestService: GuestService) {}

    @Get()
    public async GetParties(): Promise<IParty[]> {
        const parties = await Party.find();
        return parties;
    }

    @Post()
    public async CreateParty(@Body() request: CreateParty): Promise<GenResSingle<IParty>> {
        return GenResFactory.successfulOne(await this.partyService.createParty(request));
    }

    @Post("/join")
    public async JoinParty(@Body() request: JoinParty): Promise<GenRes<Session>> {
        return await this.partyService.joinParty(request);
    }

    @Post("/refresh")
    public async RefreshPartyToken(@Req() request: Request): Promise<GenRes<Session>> {
        const token = request.headers["party-token"] as string;
        return await this.guestService.refreshToken(token);
    }

    @Get("/current")
    @UseGuards(PartyAuthGuard)
    public async GetParty(@Req() request: Request): Promise<GenRes<IParty>> {
        const token = request.headers["party-token"] as string;
        return await this.guestService.getCurrentParty(token);
    }
}