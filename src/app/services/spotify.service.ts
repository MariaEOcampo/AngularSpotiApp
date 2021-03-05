import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQAumpf7iYmw2edEwEFZ6OwlH6kjFsIsfN31XZsgVhufDzz0dZBM-pKpHlStisD4qhGua2JnlxvaQN3o_64',
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data) => {
        return data['albums'].items;
      })
    );
  }

  getArtists(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist`).pipe(
      map((data) => {
        return data['artists'].items;
      })
    );
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data) => {
        return data['tracks'];
      })
    );
  }
}
