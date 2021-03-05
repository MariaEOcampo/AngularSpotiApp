import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newSongs: any[] = [];
  loading: boolean;
  error: boolean = false;
  errorMessage: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
    this.spotify.getNewReleases().subscribe(
      (data: any) => {
        console.log(data);
        this.newSongs = data;
        this.loading = false;
      },
      (errorService) => {
        this.error = true;
        this.loading = false;
        console.log(errorService.error.error.message);
        this.errorMessage = errorService.error.error.message;
      }
    );
  }

  ngOnInit(): void {}
}
