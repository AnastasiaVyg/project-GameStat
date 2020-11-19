import {Player} from "./Player";

export class Team {
    static readonly empty = new Team(-1, "", [])
    private _name: string
    private _players: Array<Player>

    constructor(readonly id: number, name: string, players: Array<Player>) {
        this.id = id
        this._name = name
        this._players = players
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get players(): Array<Player> {
        return this._players;
    }

    set players(value: Array<Player>) {
        this._players = value;
    }

    getPlayersInfo(): string {
        let names = this._players.map(player => player.name);
        // console.log("names- " +names)
        return names.join(", ")
    }
}