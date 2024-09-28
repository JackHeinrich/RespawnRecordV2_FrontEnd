export interface Game {
    cover: {id: number, url: string},
    first_release_date: number,
    genres: [{id: number, name: string}],
    id: number,
    name: string,
    summary: string,
    total_rating: number,
    length: number;
}