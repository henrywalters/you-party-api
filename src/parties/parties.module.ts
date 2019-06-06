import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { PartyController } from "./parties.controller";
import { PartyService } from "./parties.service";
import { Words } from "src/utilities/words";
import { RouteInfo } from "@nestjs/common/interfaces";
import { GuestService } from "./guests.service";

@Module({
    controllers: [PartyController],
    providers: [PartyService, GuestService, Words],
    exports: [PartyService],
})
export class PartyModule {

}