import {Game} from "./Game";



export class GameSessionMonth {
    static readonly empty = new GameSessionMonth(0, Game.empty, 0)
    private _month: number
    private _game: Game
    private _count: number

    constructor(month: number, game: Game, count: number) {
        this._month = month
        this._game = game
        this._count = count
    }

    get month(): number {
        return this._month;
    }

    set month(value: number) {
        this._month = value;
    }

    get game(): Game {
        return this._game;
    }

    set game(value: Game) {
        this._game = value;
    }

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        this._count = value;
    }
}

export class GameSessionMonthDto {
    constructor(readonly month: number, readonly gameId: number, readonly count: number) {
    }
}