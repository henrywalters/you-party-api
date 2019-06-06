import { Entity, Column, ManyToOne } from "typeorm";
import Base from "./base";
import { IVote, VoteType } from "you-party-shared";
import { Guest } from "./guest.entity";
import { PlaylistVideo } from "./playlistVideo.entity";

@Entity()
export class Vote extends Base implements IVote {
    @Column({type: "int"})
    type: VoteType;

    @ManyToOne(type => Guest, guest => guest.votes)
    guest: Guest;

    @ManyToOne(type => PlaylistVideo, video => video.votes)
    playlistVideo: PlaylistVideo;
}