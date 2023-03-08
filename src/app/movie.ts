export interface Movie {
    Title: string;
    Year: string;
    Plot: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster?: string;
    [key: string]: any;
}
