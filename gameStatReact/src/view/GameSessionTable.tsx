import React, {Dispatch} from 'react';
import MaterialTable, {Column} from 'material-table';
import {GameSession, Result} from "../model/GameSession";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store/Storable";
import CircularIndeterminate from "./Loader";
import {
    loadGames,
    loadPlayers,
    loadGameSessions,
    deleteGameSession,
    loadTeams
} from "../store/Actions";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import AddNewResultDialog from "./AddNewResultDialog";
import {Game} from "../model/Game";
import {Team} from "../model/Team";

export interface GameSessionRow {
    date: string;
    game: string;
    team: string;
    result: string;
    gameSession: GameSession;
}

export function GameSessionTable() {
    const isLoadedGameSessions = useSelector((state: AppState) => state.isLoadedGameSessions)
    const isLoadedPlayers = useSelector((state: AppState) => state.isLoadedPlayers)
    const isLoadedGames = useSelector((state: AppState) => state.isLoadedGames)
    const isLoadedTeams = useSelector((state: AppState) => state.isLoadedTeams)
    const gameSessions = useSelector((state: AppState) => {return state.gameSessions})
    const games = useSelector((state: AppState) => {return state.games})
    const players = useSelector((state: AppState) => {return state.players})
    const teams = useSelector((state: AppState) => {return state.teams})
    const userData = useSelector((state: AppState) => state.userData)
    const dispatch = useDispatch()

    if (!isLoadedGames){
        loadGames(dispatch, userData)
        return (
            <CircularIndeterminate/>
        )
    }
    if (!isLoadedPlayers){
        loadPlayers(dispatch, userData)
        return (
            <CircularIndeterminate/>
        )
    }
    if (!isLoadedTeams){
        loadTeams(dispatch, userData)
        return (
            <CircularIndeterminate/>
        )
    }
    if (!isLoadedGameSessions){
        loadGameSessions(dispatch, userData)
        return (
            <CircularIndeterminate/>
        )
    }

    const gameSessionRows: GameSessionRow[] = gameSessions.map(gameSession => {
        let results = gameSession.results.map(result => result.player.name + " - " + result.points);
        return {
            date: gameSession.date.toDateString(),//toISOString().substring(0,10),
            game: gameSession.game.name,
            team: gameSession.team.name,
            result:results.join(", "),
            gameSession: gameSession
        }
    })

    const columns : Column<GameSessionRow>[] = [
        {title: 'Date', field: 'date'},
        {title: 'Game', field: 'game'},
        {title: 'Team', field: 'team'},
        {title: 'Result', field: 'result'}
    ]

    return (
        <>
            <MaterialTable
                title="GameSessions"
                columns={columns}
                data={gameSessionRows}
                options={{
                    actionsColumnIndex: -1
                }}
                editable={{
                    onRowDelete: (oldData) =>{
                        deleteGameSession(dispatch, oldData.gameSession.id)
                        return Promise.resolve()
                    }
                }}
            />
            <AddNewResultDialog games={games} teams={teams} players={players} dispatch={dispatch}/>
        </>
    );
}