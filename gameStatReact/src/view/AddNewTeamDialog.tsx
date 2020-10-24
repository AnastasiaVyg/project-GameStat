import React, {Dispatch} from "react";
import {Button, Grid} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Player} from "../model/Player";
import Typography from "@material-ui/core/Typography";
import {addTeam} from "../store/Actions";

export interface NewTeamDialogProps {
    players: Array<Player>
    dispatch: Dispatch<any>
}

export default function AddNewTeamDialog(props: NewTeamDialogProps) {

    const [open, setOpen] = React.useState(false);

    const [teamPlayers, addPlayer] = React.useState([] as Player[]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        addPlayer([])
    };

    const nameInputText: React.RefObject<HTMLInputElement> = React.createRef()

    const handleAddPlayerToTeam = (event: React.ChangeEvent<{}>, value: Player | null) => {
        console.log(value)
        if (value != null && !teamPlayers.find(value1 => value1 == value)){
            teamPlayers.push(value)
            addPlayer([...teamPlayers])
        }
    }

    const handleAddNewTeam = () => {
        setOpen(false);
        addPlayer([])
        const nameTeam: string = nameInputText.current!.value
        addTeam(props.dispatch, nameTeam, teamPlayers)
    }

    const listPlayers = teamPlayers.map(player => <li><Typography color="textPrimary" align="left">{player.name}</Typography></li>)

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add new Team
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="add-team-dialog">
                <DialogTitle id="add-team-dialog">Add new Team</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={nameInputText}
                                autoFocus
                                margin="dense"
                                id="Team name"
                                label="Team name"
                                type="text"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h5" color="textPrimary">Players</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ul>
                                {listPlayers}
                            </ul>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <ComboBox players={props.players} handler={handleAddPlayerToTeam}/>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddNewTeam} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export interface PlayersProps{
    players: Array<Player>
    handler: (event: React.ChangeEvent<{}>, value: Player | null) => void
}

export function ComboBox(props: PlayersProps) {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={props.players}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={props.handler}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
    );
}
