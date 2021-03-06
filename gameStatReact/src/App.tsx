import React from 'react';
import {createStore} from "redux";
import './App.css';
import {GameTable} from "./view/GameTable";
import {PlayerTable} from "./view/PlayerTable";
import {GameSessionTable} from "./view/GameSessionTable";
import Tabs from "@material-ui/core/Tabs";
import AppBar from '@material-ui/core/AppBar';
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {Provider, useDispatch, useSelector} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {AppState, storable} from "./store/Storable";
import {Container} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {CLEAR_ERROR_MESSAGE, SET_ERROR_MESSAGE} from "./store/ActionConsts";
import LoginDialog from "./view/LoginDialog";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {authenticationFetch, logoutFetch} from "./store/Actions";
import {TeamTable} from "./view/TeamTable";
import StatisticsTabs from "./view/statistics/StatisticsTabs";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
            </Box>
            )}
        </div>
    );
}

const store = createStore(storable, composeWithDevTools())

export function App() {
    return (
            <Provider store={store}>
                <Container fixed>
                    <div className="App">
                        <Typography variant="h3" color="textPrimary">GameStat</Typography>
                        <LoginLogoutButtons/>
                        <MainTabs/>
                    </div>

                    </Container>
                <ErrorMessage/>
            </Provider>
    );
}

export function MainTabs() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const isAuthorization = useSelector((state: AppState) => {return state.userData.isAuthorization})
    if (!isAuthorization){
        return <></>;
    }

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Games"/>
                    <Tab label="Players"/>
                    <Tab label="Teams"/>
                    <Tab label="Results"/>
                    <Tab label="Statistics"/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <GameTable/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PlayerTable/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TeamTable/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <GameSessionTable/>
            </TabPanel>
            <TabPanel index={4} value={value}>
                <StatisticsTabs/>
            </TabPanel>
        </div>

    );
}

function ErrorMessage(){
    const message =  useSelector((state :AppState)  => {return state.errorMessage})
    const dispatch = useDispatch()

    const handleHideError = () => {
        dispatch({type: CLEAR_ERROR_MESSAGE})
    }

    if (message === ""){
        return <></>
    }

    return <Snackbar
        anchorOrigin={{horizontal:"center", vertical:"bottom"}}
        open={true}
        message={message}
        autoHideDuration={6000}
        onClose={handleHideError}

    />
}

function LoginLogoutButtons() {
    const dispatch = useDispatch()
    const isAuthorization = useSelector((state: AppState) => {return state.userData.isAuthorization})
    const userName = useSelector((state: AppState) => {return state.userData.name})

    const loginHandle = () => {
        authenticationFetch(dispatch)
    }
    const logoutHandle = () => {
        logoutFetch(dispatch)
    }

    let welcome: JSX.Element = <></>;
    let button: JSX.Element;

    if (isAuthorization){
        welcome = <Typography color="textPrimary">Welcome, {userName}</Typography>
        button = <Box mb={4}><Button color = "primary" variant="outlined" onClick={logoutHandle}>Logout</Button></Box>
    } else {
        button = <Box mb={4}><Button color = "primary" variant="outlined" onClick={loginHandle}>Login</Button></Box>
    }

    return <div>
        <Grid container aria-colspan={5} alignItems="flex-start" justify="flex-end" direction="row">
            {button}
        </Grid>
        <Grid container aria-colspan={5} alignItems="flex-start" justify="flex-end" direction="row">
            <Box mb={4}>
                {welcome}
            </Box>
        </Grid>
    </div>
}
