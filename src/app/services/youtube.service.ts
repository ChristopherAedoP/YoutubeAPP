import { Injectable } from '@angular/core';
import { Http , URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyCq8LiBNi4Y6NHjvkb3_TPAgTIWnU41i5M';
  private playlist = 'UUNYW2vfGrUE6R5mIJYzkRyQ';

  private nextPageToken = '';

  constructor(public _http: Http) {}
  getListaVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;

    const parametros = new URLSearchParams();

    parametros.set('part', 'snippet');
    parametros.set('maxResults', '10');
    parametros.set('playlistId', this.playlist);

    parametros.set('key', this.apikey);

    if (this.nextPageToken) {
        parametros.set('pageToken', this.nextPageToken);
    }

    return this._http
      .get(url, {
        search: parametros
      })
      .map(res => {
        console.log(res.json());
        this.nextPageToken = res.json().nextPageToken;

        const videos: any[] = [];

        for (const video of res.json().items ){
          const snippet = video.snippet;
          videos.push(snippet);
        }

        return videos;
      });
  }
}
