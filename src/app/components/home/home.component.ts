import { YoutubeService } from './../../services/youtube.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  videoSel: any;

  constructor(public _ys: YoutubeService) {
    this._ys.getListaVideos().subscribe(videos => {
      console.log(videos);
      this.videos = videos;
    });
  }

  ngOnInit() {}

  verVideo(video: any) {
    this.videoSel = video;
    $('#exampleModal').modal();
    // $('#exampleModal').on('hidden.bs.modal', argumentos => {
    //   this.videoSel = null;
    // });
  }
  cerrarVideo() {
    $('#exampleModal').modal('hide');
    this.videoSel = null;
  }
  cargarMas() {
        this._ys.getListaVideos().subscribe(videos => this.videos.push.apply( this.videos , videos)
        );
  }
}
