import { Component, Input } from '@angular/core';
import { Movie } from '../movie';
import { isMovieBooked } from '../booked-movies';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
    private _allMovies: Movie[] = [];
    filteredMovies: Movie[] = [];
    
    @Input() set allMovies(movies: Movie[]) {
        this._allMovies = movies;
        this.filteredMovies = movies;
    }
    
    get allMovies(): Movie[] {
        return this._allMovies;
    }
    
    isBooked(movie: Movie): boolean {
        return isMovieBooked(movie);
    }

    getGenres(movies: Movie[]): string[] {
        let allGenres = new Set<string>();
        for (let movie of movies) {
            for (let genre of movie.Genre?.split(",") ?? []) {
                allGenres.add(genre.trim());
            }
        }

        return Array.from(allGenres);
    }

    filterMovies(genres: string[]) {
        let newFilteredMovies = [];

        for (let movie of this.allMovies) {
            if (!genres.length || genres.every(genre => movie.Genre?.includes(genre) ?? false)) {
                newFilteredMovies.push(movie);
            }
        }

        this.filteredMovies = newFilteredMovies;
    }
}
