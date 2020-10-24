import {Player} from "./Player";
import {Game} from "./Game";
import {Team} from "./Team";

export interface Result {
    player: Player
    points: number
}

export class GameSession {
    static readonly empty = new GameSession("-1", new Date, Game.empty, Team.empty, [])
    private _date: Date
    private _game: Game
    private _team: Team
    private _results: Array<Result>


    constructor(readonly id: string, date: Date, game: Game, team: Team, results: Array<Result>) {
        this._date = date;
        this._game = game;
        this._team = team;
        this._results = results;
    }


    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get game(): Game {
        return this._game;
    }

    set game(value: Game) {
        this._game = value;
    }

    get team(): Team {
        return this._team;
    }

    set team(value: Team) {
        this._team = value;
    }

    get results(): Array<Result> {
        return this._results;
    }

    set results(value: Array<Result>) {
        this._results = value;
    }
}

export interface ResultDto{
    playerId: string
    points: number
}

export class GameSessionDto {
    constructor(readonly id: string, readonly date: string, readonly gameId: string, readonly teamId: string, readonly results: Array<ResultDto>) {
    }

}