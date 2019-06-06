import { Entity, OneToMany, Column, ManyToOne, BaseEntity } from "typeorm";
import { Session } from "./session.entity";
import { Party } from "src/entities/party.entity";
import { IGuest } from "you-party-shared";
import Base from "./base";
import { Vote } from "./vote.entity";

@Entity()
export class Guest extends Base implements IGuest {
    @Column()
    nickname: string;

    @OneToMany(type => Session, session => session.guest)
    sessions: Session[];

    @ManyToOne(type => Party, party => party.guests, {eager: true})
    party: Party;

    @OneToMany(type => Vote, vote => vote.guest)
    votes: Vote[];
}