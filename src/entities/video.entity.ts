import { Entity, Column, OneToMany } from "typeorm";
import Base from "./base";
import { IVideo } from "you-party-shared";
import { PlaylistVideo } from "./playlistVideo.entity";

@Entity()
export class Video extends Base implements IVideo {

    @Column()
    key: string;

    @Column()
    title: string;

    @Column({type: "int", default: 0})
    duration: number;

    @Column({type: "text"})
    description: string;

    @Column()
    image: string;

    @OneToMany(type => PlaylistVideo, video => video.video)
    playlistVideos: PlaylistVideo[];
}