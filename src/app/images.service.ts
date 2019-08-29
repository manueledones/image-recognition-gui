import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private httpClient: HttpClient) { }

  getStats(url: string) {
    const headers = new HttpHeaders().set('X-Host-Override', 'inception-fn.default.example.com');
    return this.httpClient.get<any[]>(`${environment.url}?imageUrl=${url}`, { headers });
  }
}
