import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  albums: any;
  artist: any;

  private routeSub: Subscription | undefined;
  private artistSub: Subscription | undefined;;
  private albumsSub: Subscription | undefined;;

  constructor(private musicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {

      this.artistSub = this.musicData.getArtistById(params['id']).subscribe(data => {
        this.artist = data;
      });

      this.albumsSub = this.musicData.getAlbumsByArtistId(params['id']).subscribe(data => {
        // only show unique album names
        this.albums = data.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index)
      });

    });

  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.artistSub?.unsubscribe();
    this.albumsSub?.unsubscribe();
  }
}
