import { Entity, ManyToOne, Column, OneToMany } from "typeorm";
import Base from "./base";
import { IPlaylistVideo } from "you-party-shared";
import { Playlist } from "./playlist.entity";
import { Video } from "./video.entity";
import { Vote } from "./vote.entity";

@Entity()
export class PlaylistVideo extends Base implements IPlaylistVideo {
    @ManyToOne(type => Playlist, playlist => playlist.videos)
    playlist: Playlist;

    @ManyToOne(type => Video, video => video.playlistVideos)
    video: Video;

    @OneToMany(type => Vote, vote => vote.playlistVideo)
    votes: Vote[];
}