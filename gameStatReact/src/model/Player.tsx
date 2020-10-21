export class Player {
    static readonly empty = new Player("-1", "")
    private _name: string

    constructor(readonly id: string, name: string) {
        this.id = id
        this._name = name
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
