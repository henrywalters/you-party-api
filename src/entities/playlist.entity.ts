import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { IPlaylist } from "you-party-shared";
import Base from "./base";
import { Party } from "./party.entity";
import { PlaylistVideo } from "./playlistVideo.entity";

@Entity()
export class Playlist extends Base implements IPlaylist {
    @Column()
    name: string;

    @ManyToOne(type => Party, party => party.playlists)
    party: Party;

    @OneToMany(type => PlaylistVideo, video => video.playlist)
    videos: PlaylistVideo[];
}