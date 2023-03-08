import { Movie } from './movie';

export var bookedMovies: Movie[] = [];

function getMovieIndex(movie: Movie): number {
    return bookedMovies.map(movie => movie.Title + movie.Year).indexOf(movie.Title + movie.Year, 0);
}

export function bookMovie(movie: Movie): boolean {
    const index: number = getMovieIndex(movie);
    if (index == -1) {
        bookedMovies.push(movie);
        return true;
    }
    return false;
}

export function unbookMovie(movie: Movie): boolean {
    const index: number = getMovieIndex(movie);
    if (index > -1) {
        bookedMovies.splice(index, 1);
        return true;
    }
    return false;
}

export function isMovieBooked(movie: Movie): boolean {
    return getMovieIndex(movie) > -1;
}
