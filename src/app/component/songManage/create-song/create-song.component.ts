import { Component, OnInit } from '@angular/core';
import {Song} from "../../../model/Song";
import {SongService} from "../../../service/song.service";

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {
  status = 'Please fill out the form to create a Song';
  form: any = {};
  song: Song;
  addFileMp3 = false;
  addAvatar = false;
  success: any = {
    message: "yes"
  }
  constructor(private songService: SongService) { }

  ngOnInit(): void {
  }
  ngSubmit(){
    this.song = new Song(
        this.form.nameSong,
        this.form.avatarSong,
        this.form.lyrics,
        this.form.mp3Url
    )
    this.songService.createSong(this.song).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create Song success!'
      }
    })
  }
  onMp3Url($event){
    this.addFileMp3 = true;
    this.form.mp3Url = $event
  }
  onAvatar($event){
    this.addAvatar = true;
    this.form.avatarSong = $event;
  }
}
