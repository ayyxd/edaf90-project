import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { bookMovie, isMovieBooked, unbookMovie } from '../booked-movies';
import { Movie } from '../movie';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
    @Input() movie: Movie = {Title: "", Year: "", Plot: ""};

    constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(MovieDialogComponent, {
            data: {movie: this.movie, booked: this.isBooked()},
            width: '600px',
        });

        dialogRef.afterClosed().subscribe(booked => {
            if (booked == undefined) {
                return;
            }

            if (booked) {
                this.tryUnbookMovie();
            } else {
                this.tryBookMovie();
            }
        });
    }

    tryBookMovie() {
        if (bookMovie(this.movie)) {
            this.openSnackBar(this.movie.Title + " successfully added!", true);
        } else {
            this.openSnackBar(this.movie.Title + " is already booked!", false);
        }
    }

    tryUnbookMovie() {
        if (unbookMovie(this.movie)) {
            this.openSnackBar(this.movie.Title + " successfully removed!", true);
        } else {
            this.openSnackBar(this.movie.Title + " is not booked!", false);
        }
    }

    openSnackBar(message: string, success: boolean) {
        this._snackBar.open(message, "Close", {
            duration: 6000,
            panelClass: success ? "snackbar-success" : "snackbar-failure"
        });
    }

    getGenres(): string[] {
        return this.movie.Genre?.split(",").map(genre => genre.trim()) ?? [];
    }

    isBooked(): boolean {
        return isMovieBooked(this.movie);
    }
}
