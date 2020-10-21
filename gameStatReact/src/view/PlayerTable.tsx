import React from 'react';
import MaterialTable, {Column} from 'material-table';
import {Player} from "../model/Player";
import {useDispatch, useSelector} from "react-redux";
import {ADD_PLAYER, DELETE_PLAYER, UPDATE_PLAYER} from "../store/ActionConsts";
import {AppState} from "../store/Storable";
import CircularIndeterminate from "./Loader";
import {addPlayer, deletePlayer, loadPlayers, updatePlayer} from "../store/Actions";

export interface PlayerRow {
    name: string;
    player: Player
}

const columns = [
            {title: 'Name', field: 'name'},
]

export function PlayerTable() {
    const isLoaded = useSelector((state: AppState) => state.isLoadedPlayers)
    const players =  useSelector((state :AppState)  => {return state.players})
    const dispatch = useDispatch()

    if (!isLoaded){
        loadPlayers(dispatch)
        return (
            <CircularIndeterminate/>
        )
    }

    const playerRows: PlayerRow[] = players.map(player => {
        return {
            name: player.name,
            player: player
        }
    })

    console.log("state authors", players)

    return (
        <MaterialTable
            title="Players"
            columns={columns}
            data={playerRows}
            options={{
                actionsColumnIndex: -1
            }}
            editable={{
                onRowAdd: (newData) => {
                    addPlayer(dispatch, newData.name)
                    return Promise.resolve()
                },
                onRowUpdate: (newData, oldData) => {
                    updatePlayer(dispatch, newData)
                    return Promise.resolve()
                },
                onRowDelete: (oldData) => {
                    deletePlayer(dispatch, oldData.player.id)
                    return Promise.resolve()
                }
            }}
        />
    );
}
