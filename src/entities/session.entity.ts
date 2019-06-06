import { Entity, Column, ManyToOne } from "typeorm";
import Base from "./base";
import { Guest } from "./guest.entity";

//4 minutes
const SessionActiveRequirementMS = 1000 * 60 * 5;

@Entity()
export class Session extends Base {

    @ManyToOne(type => Guest, guest => guest.sessions, {eager: true})
    guest: Guest;

    @Column()
    token: string;

    @Column({type: "datetime"})
    issued: Date;

    @Column({type: "datetime"})
    expires: Date;

    @Column({type: "datetime"})
    lastRefresh: Date;

    public get expired(): boolean {
        return new Date().getTime() >= this.expires.getTime();
    }

    public get active(): boolean {
        return this.lastRefresh.getTime() + SessionActiveRequirementMS > new Date().getTime();
    }

    public async refresh(): Promise<boolean> {
        if (this.expired) {
            return false;
        } else {
            this.lastRefresh = new Date();
            await this.save();
            return true;
        }
    }
}