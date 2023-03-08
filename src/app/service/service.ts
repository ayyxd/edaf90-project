import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie';

const API_KEY = "b5f15cbf";

@Injectable()
export class Service {
    constructor(private http: HttpClient) {}

    getWithAPIKey(urlParams: string): Observable<Movie> {
        return this.http.get<Movie>("https://www.omdbapi.com/" + urlParams + "&apikey=" + API_KEY);
    }

    getMovieByTitle(title: string): Observable<Movie> {
        return this.getWithAPIKey("?t=" + encodeURIComponent(title));
    }
}
