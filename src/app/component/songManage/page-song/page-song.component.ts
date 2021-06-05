import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {SongService} from "../../../service/song.service";
import {Song} from "../../../model/Song";

@Component({
  selector: 'app-page-song',
  templateUrl: './page-song.component.html',
  styleUrls: ['./page-song.component.scss']
})
export class PageSongComponent implements OnInit {
  totalElements: number = 0;
  loading: boolean;
  songs: Song[]=[];
  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getListResquest({page: 0, size: 3});
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.pageSong(request)
        .subscribe(data => {
          this.songs = data['content'];
          console.log('songList', data);
          this.totalElements = data['totalElements'];
          this.loading = false;
        }, error => {
          this.loading = false;
        });
  }


  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
  }
}
