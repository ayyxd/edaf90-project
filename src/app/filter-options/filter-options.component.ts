import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css']
})
export class FilterOptionsComponent {
    separatorKeysCodes: number[] = [ENTER, COMMA];
    genreControl = new FormControl('');
    filteredGenres: Observable<string[]> = new Observable();
    genres: string[] = [];
    @Input() allGenres: string[] = [];
    @Output() updateFilters = new EventEmitter<string[]>();

    @ViewChild('genreInput') genreInput!: ElementRef<HTMLInputElement>;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['allGenres']) {
            this.updateFilteredGenres();
        }
    }

    updateFilteredGenres() {
        this.filteredGenres = this.genreControl.valueChanges.pipe(
            startWith(null),
            map((genre: string | null) => (genre ? this._filter(genre) : this.allGenres.slice())),
        );
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.genres.push(value);
        }

        event.chipInput!.clear();
        this.genreControl.setValue(null);
        
        this.updateFilters.emit(this.genres)
    }

    remove(genre: string): void {
        const index = this.genres.indexOf(genre);

        if (index >= 0) {
            this.genres.splice(index, 1);
        }

        this.updateFilters.emit(this.genres)
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.genres.push(event.option.viewValue);
        this.genreInput.nativeElement.value = '';
        this.genreControl.setValue(null);
        
        this.updateFilters.emit(this.genres)
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allGenres.filter(genre => genre.toLowerCase().includes(filterValue));
    }
}
