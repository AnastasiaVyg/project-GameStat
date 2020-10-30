import {ComboBox} from "../AddNewTeamDialog";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/Storable";
import {deleteGameSession, getStatisticsPlayer, loadGames, loadPlayers, loadTeams} from "../../store/Actions";
import CircularIndeterminate from "../Loader";
import React from "react";
import {Player} from "../../model/Player";
import {GameSessionRow} from "../GameSessionTable";
import MaterialTable, {Column} from "material-table";
import {Grid} from "@material-ui/core";

export default function PlayerStatisticsTabs() {
    const isLoadedPlayers = useSelector((state: AppState) => state.isLoadedPlayers)
    const isLoadedGames = useSelector((state: AppState) => state.isLoadedGames)
    const isLoadedTeams = useSelector((state: AppState) => state.isLoadedTeams)
    const players =  useSelector((state :AppState)  => {return state.players})
    const gameSessions = useSelector((state: AppState) => {return state.statisticsPlayer.results})
    const player = useSelector((state: AppState) => {return state.statisticsPlayer.player})
    const dispatch = useDispatch()

    const handleStatisticsToPlayer = (event: React.ChangeEvent<{}>, value: Player | null) => {
        if (value != null){
            getStatisticsPlayer(dispatch, value.id)
        }
    }

    if (!isLoadedGames){
        loadGames(dispatch)
        return (
            <CircularIndeterminate/>
        )
    }
    if (!isLoadedPlayers){
        loadPlayers(dispatch)
        return (
            <CircularIndeterminate/>
        )
    }
    if (!isLoadedTeams){
        loadTeams(dispatch)
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

    let title = "Results to " + player.name

    return(
        <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
                <ComboBox players={players} handler={handleStatisticsToPlayer}/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <MaterialTable
                    title={title}
                    columns={columns}
                    data={gameSessionRows}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </Grid>
        </Grid>
    )
}