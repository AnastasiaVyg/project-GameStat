import React from 'react';
import MaterialTable, { Column } from 'material-table';
import {Game} from "../model/Game";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store/Storable";
import CircularIndeterminate from "./Loader";
import {addGame, deleteGame, loadGames, updateGame} from "../store/Actions";

export interface GameRow {
    name: string;
    game: Game
}

const columns = [
    {title: 'Name', field: 'name'},
]

export function GameTable() {
    const isLoaded = useSelector((state: AppState) => state.isLoadedGames)
    const games = useSelector((state: AppState) => state.games)
    const dispatch = useDispatch()

    if (!isLoaded){
        loadGames(dispatch)
        return (
            <CircularIndeterminate/>
        )
    }

    const gameRows: GameRow[] = games.map(game => {
        return {
            name: game.name,
            game: game
        }
    })

    return (
        <MaterialTable
            title="Games"
            columns={columns}
            data={gameRows}
            options={{
             actionsColumnIndex:-1
            }}
            editable={{
                onRowAdd: (newData) =>{
                    addGame(dispatch, newData.name)
                    return Promise.resolve()
                },
                onRowUpdate: (newData, oldData) =>{
                    updateGame(dispatch, newData)
                    return Promise.resolve()
                },
                onRowDelete: (oldData) =>{
                    deleteGame(dispatch, oldData.game.id)
                    return Promise.resolve()
                }
            }}
        />
    );
}