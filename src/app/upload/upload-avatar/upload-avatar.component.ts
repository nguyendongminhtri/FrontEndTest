import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AngularFireStorageReference, AngularFireStorage} from "@angular/fire/storage";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {


  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();

  @Output() sendAvatarUrl = new EventEmitter<string>();

  constructor(private httpClient: HttpClient,
              private afStorage: AngularFireStorage,
              // private songService: SongService
  ) {
  }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log('upload file');
    const id = Math.random().toString(36).substring(2); // Create a random string
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
        })
        .then(downloadURL => {
          this.downloadURL = downloadURL;
          this.giveURLtoCreate.emit(this.downloadURL);
          console.log(downloadURL);
          this.sendAvatarUrl.emit(downloadURL);
          this.checkUploadAvatar = true;
          return downloadURL;
        })
        .catch(error => {
          // Use to signal error if something goes wrong.
          console.log(`Failed to upload file and get link - ${error}`);
        });
  }

}
