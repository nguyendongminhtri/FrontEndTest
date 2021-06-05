export class Song {
    nameSong: string;
    avatarSong: string;
    lyrics: string;
    mp3Url: string;
    constructor(nameSong: string, avatarSong: string, lyrics: string, mp3Url: string) {
        this.nameSong = nameSong;
        this.avatarSong = avatarSong;
        this.lyrics = lyrics;
        this.mp3Url = mp3Url;
    }
}
