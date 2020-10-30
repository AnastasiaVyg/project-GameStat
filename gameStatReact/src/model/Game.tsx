
export class Game {
    static readonly empty = new Game(-1, "")
    private _name: string

    constructor(readonly id: number, name: string) {
         this._name = name
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
