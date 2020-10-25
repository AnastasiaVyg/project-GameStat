import React, {Dispatch, useRef} from "react";
import {Button, Grid} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {GameSession, GameSessionDto, Result, ResultDto} from "../model/GameSession";
import {Player} from "../model/Player";
import {Game} from "../model/Game";
import {Team} from "../model/Team";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import {ComboBox} from "./AddNewTeamDialog";
import {addGameSession, addPlayer} from "../store/Actions";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

export interface NewResultDialogProps {
    games: Array<Game>
    teams: Array<Team>
    players: Array<Player>
    dispatch: Dispatch<any>
}

// export interface PlayerResult {
//     playerId: string
//     points: number
// }

// class InnerState {
//     static empty = new InnerState();
//
//     game: Game = Game.empty;
//     team: Team = Team.empty;
//     date: Date = new Date();
//     results : Array<ResultDto> = [];
//     listPlayers: JSX.Element[] = [];
// }

export default function AddNewResultDialog(props : NewResultDialogProps) {
    const [open, setOpen] = React.useState(false)
    const [game, addGame] = React.useState(Game.empty)
    const [team, addTeam] = React.useState(Team.empty)
    const [results, addResult] = React.useState([] as Array<ResultDto>)
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
    // const [innerState, setInnerState] = React.useState(InnerState.empty)
    const pl: JSX.Element[] = []
    const [listPlayers, addListPlayers] = React.useState(pl)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const clearStates = () => {
        addListPlayers([])
        addGame(Game.empty)
        addTeam(Team.empty)
        addResult([])
        setSelectedDate(new Date())
        // setInnerState(InnerState.empty)
    }

    const handleClose = () => {
        setOpen(false);
        clearStates()
    };

    const handleDateChange = (date: Date | null) => {
        if (date == null){
            return
        }
        setSelectedDate(date);
        // setInnerState({...innerState, date: date})
    };

    const inputText: React.RefObject<HTMLInputElement> = React.createRef()

    const handleAddGame = (event: React.ChangeEvent<{}>, value: Game | null) => {
        console.log(value)
        if (value == null){
            return
        }
        // setInnerState({...innerState, game: value });
        addGame(value)
    }

    const handleAddTeam = (event: React.ChangeEvent<{}>, value: Team | null) => {
        console.log(value)
        if (value == null){
            return
        }
        addResult([])
        addTeam(value)
        // setInnerState({...innerState, results: [], team: value})
        const listPlayers = value.players.map(player =>
            <li>
                <TextField
                    key={player.id}
                    inputRef={inputText}
                    autoFocus
                    margin="dense"
                    id={player.id}
                    label={player.name + " points"}
                    type="text"
                    fullWidth
                    onChange={event => {
                        results.push({playerId: event.target.id, points: Number(event.target.value)})
                        addResult([... results])
                        // setInnerState({...innerState, results: [...innerState.results]})
                    }}
                />
            </li>)
        // setInnerState({...innerState, listPlayers: [...listPlayers]})
        addListPlayers([...listPlayers])
    }

    const handleAddResult = () => {
        const dto = new GameSessionDto("-1", selectedDate.toISOString().substring(0,10), game.id, team.id, results)
        addGameSession(props.dispatch, dto)
        setOpen(false)
        clearStates()
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add new game result
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="create-gameResult-dialog">
                <DialogTitle id="create-gameResult-dialog">Add new game result</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <MaterialUIPickers initialDate={selectedDate} handler={handleDateChange}/>
                        <Grid item xs={12} sm={3}>
                            <Typography color="textPrimary">Game</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <GamesComboBox games={props.games} handler={handleAddGame}/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography color="textPrimary">Team</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TeamsComboBox teams={props.teams} handler={handleAddTeam}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ul>
                                {listPlayers}
                            </ul>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddResult} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export interface GamesProps{
    games: Array<Game>
    handler: (event: React.ChangeEvent<{}>, value: Game | null) => void
}

export function GamesComboBox(props: GamesProps) {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={props.games}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={props.handler}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
    );
}

export interface TeamsProps{
    teams: Array<Team>
    handler: (event: React.ChangeEvent<{}>, value: Team | null) => void
}

export function TeamsComboBox(props: TeamsProps) {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={props.teams}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={props.handler}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
    );
}

export interface PickerProps {
    initialDate: Date | null
    handler: (date : Date | null) => void
}

export function MaterialUIPickers(props: PickerProps) {
    // The first commit of Material-UI
    // const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    //     new Date(),
    // );
    //
    // const handleDateChange = (date: Date | null) => {
    //     setSelectedDate(date);
    // };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={props.initialDate}
                    onChange={props.handler}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}