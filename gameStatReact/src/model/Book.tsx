import {Player} from "./Player";
import {Game} from "./Game";

export class Book {
    static readonly empty = new Book("-1", "", Player.empty, Game.empty, -1)
    private _name: string
    private _year: number
    private _author: Player
    private _genre: Game
    private _comments: Array<string>
    private _isLoadedComments: boolean

    constructor(readonly id: string, name: string, author: Player, genre: Game, year: number) {
        this._name = name
        this._year = year
        this._author = author
        this._genre = genre
        this._comments = []
        this._isLoadedComments = false
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        this._year = value;
    }

    get author(): Player {
        return this._author;
    }

    set author(value: Player) {
        this._author = value;
    }

    get genre(): Game {
        return this._genre;
    }

    set genre(value: Game) {
        this._genre = value;
    }

    get comments(): Array<string> {
        return this._comments;
    }

    set comments(value: Array<string>) {
        this._comments = value;
    }

    addComment(value: string) {
        this._comments.push(value);
    }

    get isLoadedComments(): boolean {
        return this._isLoadedComments;
    }

    set isLoadedComments(value: boolean) {
        this._isLoadedComments = value;
    }
}

export class BookDto {
    constructor(readonly id: string, readonly name: string, readonly authorId: string, readonly genreId: string, readonly year: number) {
    }

}