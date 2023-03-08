import { Component, Output } from '@angular/core';
import { concat, concatMap, Observable } from 'rxjs';
import { bookedMovies } from './booked-movies';
import { Movie } from './movie';
import { Service } from './service/service';
import { AVAILABLE_MOVIE_TITLES } from './available-movies';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [Service]
})
export class AppComponent {
    title = 'my-app';
    availableMovies: Movie[] = [];
    bookedMovies: Movie[] = bookedMovies;

    constructor(private _service: Service) {
        this.fetchAvailableMovies();
    }

    fetchAvailableMovies() {
        const observableMovies: Observable<Movie>[] = AVAILABLE_MOVIE_TITLES.map(title => this._service.getMovieByTitle(title));

        concat(...observableMovies).subscribe(movie =>
            this.availableMovies.push(movie)
        );
    }
}
