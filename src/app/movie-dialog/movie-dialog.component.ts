import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../movie';

export interface DialogData {
    movie: Movie;
    booked: boolean;
}

@Component({
    selector: 'app-movie-dialog',
    templateUrl: './movie-dialog.component.html',
    styleUrls: ['./movie-dialog.component.css']
})
export class MovieDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<MovieDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
