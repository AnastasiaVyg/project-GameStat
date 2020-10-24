import React, {Dispatch, useRef} from "react";
import {Button, Grid} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {GameSession, Result} from "../model/GameSession";
import {Player} from "../model/Player";
import {Game} from "../model/Game";
import {Team} from "../model/Team";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";
import {ComboBox} from "./AddNewTeamDialog";
import {addPlayer} from "../store/Actions";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

export interface NewResultDialogProps {
    games: Array<Game>
    teams: Array<Team>
    players: Array<Player>
    dispatch: Dispatch<any>
}

export interface PlayerResult {
    player: Player
    points: number
}

export default function AddNewResultDialog(props : NewResultDialogProps) {
    const [open, setOpen] = React.useState(false)
    const [game, addGame] = React.useState(Game.empty)
    const [team, addTeam] = React.useState(Team.empty)
    const [results, addResult] = React.useState([] as Array<PlayerResult>)

    const pl: JSX.Element[] = []
    const [listPlayers, addListPlayers] = React.useState(pl)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        addListPlayers([])
        addGame(Game.empty)
        addTeam(Team.empty)
    };

    const inputText: React.RefObject<HTMLInputElement> = React.createRef()

    const handleAddGame = (event: React.ChangeEvent<{}>, value: Game | null) => {
        console.log(value)
        if (value == null){
            return
        }
        addGame(value)
    }

    const handleAddTeam = (event: React.ChangeEvent<{}>, value: Team | null) => {
        console.log(value)
        if (value == null){
            return
        }
        addTeam(value)
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
                    onChange={event => console.log(event.target.value + "  " + event.target.id)}
                />
            </li>)
        addListPlayers([...listPlayers])
    }

    const handleAddComment = () => {
        const comment: string = inputText.current!.value
        // addComment(props.dispatch, props.book.id, comment)
        setOpen(false);
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
                        <MaterialUIPickers/>
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
                    <Button onClick={handleAddComment} color="primary">
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

export function MaterialUIPickers() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date(),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

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
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}