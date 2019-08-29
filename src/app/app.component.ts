import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  stats;
  data;
  loading = false;
  error;
  images = [
    { url: 'https://cdn.britannica.com/55/174255-004-9A4971E9.jpg', active: false },
    { url: 'https://cdn.pixabay.com/photo/2017/07/24/20/08/old-farmhouse-2535919_960_720.jpg', active: false },
    { url: 'https://images.pexels.com/photos/1238347/pexels-photo-1238347.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', active: false },
    { url: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', active: false },
    { url: 'https://images.pexels.com/photos/169363/pexels-photo-169363.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', active: false },
    { url: 'https://images.pexels.com/photos/163178/laptop-notebook-computer-work-163178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', active: false },
    { url: 'https://images.pexels.com/photos/1234064/pexels-photo-1234064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', active: false },
    { url: 'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', active: false },
    { url: 'https://images.pexels.com/photos/17679/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', active: false },
    { url: 'https://images.pexels.com/photos/2132008/pexels-photo-2132008.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', active: false },
    { url: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', active: false },
    { url: 'https://images.pexels.com/photos/327378/pexels-photo-327378.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', active: false },
  ];
  constructor(public imageService: ImagesService) {

  }

  ngOnInit() {

  }

  selectImage(index: number) {
    this.images.forEach((img, i) => {
      img.active = i === index;
    });
    this.getStats(this.images[index].url);
  }

  getStats(url: string) {
    this.loading = true;
    this.stats = null;
    this.data = null;
    this.error = null;

    this.imageService.getStats(url).pipe(
      catchError(error => {
        console.log(error);
        this.error = error.error;
        return throwError(error);
      }),
      tap(stats => {
        this.stats = stats.map(s => ({
          ...s,
          score: (s.score * 100).toFixed(2)
        }));
        this.data = this.stats.map(s => ({ name: s.name, value: s.score }));
      }),
      finalize(() => this.loading = false),
    ).subscribe();
  }
}
