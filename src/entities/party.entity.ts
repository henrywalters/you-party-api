import { Entity, Column, OneToMany } from "typeorm";
import Base from "./base";
import { IParty } from "you-party-shared";
import { Guest } from "./guest.entity";
import { Playlist } from "./playlist.entity";

@Entity()
export class Party extends Base implements IParty {
    @Column()
    key: string;

    @Column()
    name: string;

    @OneToMany(type => Guest, guest => guest.party)
    guests: Guest[];

    @OneToMany(type => Playlist, playlist => playlist.party)
    playlists: Playlist[];
}