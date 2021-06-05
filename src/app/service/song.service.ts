import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Song} from "../model/Song";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private API_SONG = 'http://localhost:8080/api/song'
  constructor(private http: HttpClient) { }
  createSong(song: Song): Observable<any>{
    return this.http.post<any>(this.API_SONG, song)
  }
  pageSong(request){
    const params = request;
    return this.http.get(this.API_SONG, {params})
  }
}
