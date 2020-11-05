import {Team} from "../model/Team";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store/Storable";
import {deleteTeam, loadPlayers, loadTeams} from "../store/Actions";
import CircularIndeterminate from "./Loader";
import MaterialTable from "material-table";
import React from "react";
import AddNewTeamDialog from "./AddNewTeamDialog";

export interface TeamRow {
    name: string
    players: string
    team: Team
}

const columns = [
    {title: 'Name', field: 'name'},
    {title: 'Players', field: 'players'}
]

export function TeamTable() {
    const isLoadedTeams = useSelector((state: AppState) => state.isLoadedTeams)
    const teams =  useSelector((state :AppState)  => {return state.teams})
    const isLoadedPlayers = useSelector((state: AppState) => {return state.isLoadedPlayers})
    const players = useSelector((state :AppState) => {return state.players})
    const userData = useSelector((state: AppState) => state.userData)
    const dispatch = useDispatch()

    if (!isLoadedTeams){
        loadTeams(dispatch, userData)
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

    const teamRows: TeamRow[] = teams.map(team => {
        let names = team.players.map(player => player.name);
        return {
            name: team.name,
            players: names.join(", "),
            team: team
        }
    })

    return (
        <>
            <MaterialTable
                title="Teams"
                columns={columns}
                data={teamRows}
                options={{
                    actionsColumnIndex: -1
                }}
                editable={{
                    onRowDelete: (oldData) => {
                        deleteTeam(dispatch, oldData.team.id)
                        return Promise.resolve()
                    }
                }}
            />
            <AddNewTeamDialog dispatch={dispatch} players={players}/>
            </>
    );

}
