import {Dispatch} from "react";
import {Game} from "../model/Game";
import {
    ADD_PLAYER,
    ADD_GAME_SESSION,
    ADD_GAME,
    DELETE_PLAYER,
    DELETE_GAME_SESSION,
    DELETE_GAME,
    LOAD_PLAYERS,
    LOAD_GAME_SESSIONS,
    LOAD_GAMES,
    SET_ERROR_MESSAGE,
    UPDATE_PLAYER,
    UPDATE_GAME_SESSION,
    UPDATE_GAME,
    CLEAR_DATA,
    LOAD_TEAMS,
    DELETE_TEAM,
    ADD_TEAM,
    STATISTICS_PLAYER,
    STATISTICS_SESSION_MONTH,
    AUTHENTICATION
} from "./ActionConsts";
import {Player} from "../model/Player";
import {GameSessionDto} from "../model/GameSession";
import {GameRow} from "../view/GameTable";
import {PlayerRow} from "../view/PlayerTable";
import {GameSessionRow} from "../view/GameSessionTable";
import {Team} from "../model/Team";
import {GameSessionMonthDto} from "../model/GameSessionMonth";
import * as URl from "url";
import {AppState, UserData} from "./Storable";
import {useSelector} from "react-redux";

const LOGIN_URL = '/gameserver/login'
const LOGOUT_URL = '/gameserver/logout'
const GAMES_URL = '/gameserver/games'
const PLAYERS_URL = '/gameserver/players'
const TEAMS_URL = '/gameserver/teams'
const GAME_SESSION_URL = '/gameserver/results'
const STATISTICS_PLAYER_URL = '/gameserver/statistics/player'
const STATISTICS_POPULAR_GAMES_URL = '/gameserver/statistics/games'

export interface FetchProps {
    url: string
    method: string
    body: string
    responseFunc: { (r: Response): void }
    userId: number
    userKey: string
}

function baseFetch(dispatch: Dispatch<any>, props: FetchProps) {
    let responseHandle = (response: Response) => {
        if (response.ok){
            props.responseFunc(response)
        }
        if (response.status === 401) {
            authorizationFetch(dispatch, props)
        }
        if (response.status === 403) {
            dispatch({type: SET_ERROR_MESSAGE, message: "Ошибка авторизации"})
        }
    }
    let errorHandle = (e: any) => dispatch({type: SET_ERROR_MESSAGE, message: "Ошибка при загрузке данных"})

    if (props.body === "")
        fetch(props.url, {
            method: props.method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(responseHandle).catch(errorHandle)
    else
        fetch(props.url, {
            method: props.method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: props.body
        }).then(responseHandle).catch(errorHandle)
}

export function authenticationFetch(dispatch: Dispatch<any>) {
    const wnd = window.open(`http://localhost:8080/userserver/user`,"AuthWindow",
        "height=700,width=500,dependent,modal,alwaysRaised,chrome=yes,centerscreen");

    window.addEventListener("message",e => {
        if (e.origin != `http://localhost:8080`){
            return
        }
        const userData: UserData = {name: e.data.name, id: e.data.id, key: e.data.key, isAuthorization: true}
        dispatch({type: AUTHENTICATION, data: userData})
    }, false)

}

export function authorizationFetch(dispatch: Dispatch<any>, props: FetchProps) {
    fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: "include",
        redirect: "manual",
        body: "username=" + props.userId +"&password=" + props.userKey
    }).then(response => {
        console.log(response.status)
        if (response.ok){
            console.log(response.url)
            baseFetch(dispatch, props)
        } else {
            dispatch({type: SET_ERROR_MESSAGE, message: "Ошибка при загрузке данных"})
        }
    })
}

export function logoutFetch(dispatch: Dispatch<any>) {
    fetch(LOGOUT_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        redirect: "manual"
    }).then(response => {
        dispatch({type: CLEAR_DATA})
    })

    fetch('/userserver/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        redirect: "manual"
    }).then(response => {
        dispatch({type: CLEAR_DATA})
    })
}

export function loadGames(dispatch: Dispatch<any>, userData: UserData) {
    let props = {
        url: GAMES_URL,
        method: 'GET',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const games = data as Array<Game>
                    dispatch({type: LOAD_GAMES, data: games})
                })
            }
        },
        userId: userData.id,
        userKey: userData.key
    }
    baseFetch(dispatch, props)
}

export function loadPlayers(dispatch: Dispatch<any>, userData: UserData) {
    let props = {
        url: PLAYERS_URL,
        method: 'GET',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const players = data as Array<Player>
                    dispatch({type: LOAD_PLAYERS, data: players})
                })
            }
        },
        userId: userData.id,
        userKey: userData.key
    }
    baseFetch(dispatch, props)
}

export function loadTeams(dispatch: Dispatch<any>, userData: UserData) {
    let props = {
        url: TEAMS_URL,
        method: 'GET',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const teams = data as Array<Team>
                    dispatch({type: LOAD_TEAMS, data: teams})
                })
            }
        },
        userId: userData.id,
        userKey: userData.key
    }
    baseFetch(dispatch, props)

}

export function loadGameSessions(dispatch: Dispatch<any>, userData: UserData) {
    let props = {
        url: GAME_SESSION_URL,
        method: 'GET',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const gameSessionDtos = data as Array<GameSessionDto>
                    dispatch({type: LOAD_GAME_SESSIONS, data: gameSessionDtos})
                })
            }
        },
        userId: userData.id,
        userKey: userData.key
    }
    baseFetch(dispatch, props)
}

export function addGame(dispatch: Dispatch<any>, name: string) {
    let props = {
        url: GAMES_URL,
        method: 'POST',
        body: JSON.stringify({name: name}),
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const game = data as Game
                    dispatch({type: ADD_GAME, data: game})
                })
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function updateGame(dispatch: Dispatch<any>, gameRow: GameRow) {
    let props = {
        url: GAMES_URL + "/" + gameRow.game.id,
        method: 'PUT',
        body: JSON.stringify({name: gameRow.name}),
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    if (data === true) {
                        dispatch({type: UPDATE_GAME, row: gameRow})
                    }
                })
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function deleteGame(dispatch: Dispatch<any>, id: number) {
    let props = {
        url: GAMES_URL + "/" + id,
        method: 'DELETE',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.text().then(value => {
                    if (value == "true"){
                        dispatch({type: DELETE_GAME, data: id})
                    } else {
                        dispatch({type: SET_ERROR_MESSAGE, message: "Нельзя удалить игру, для которой есть результаты"})
                    }
                })

            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function addPlayer(dispatch: Dispatch<any>, name: string) {
    let props = {
        url: PLAYERS_URL,
        method: 'POST',
        body: JSON.stringify({name: name}),
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const author = data as Player
                    dispatch({type: ADD_PLAYER, data: author})
                })
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function updatePlayer(dispatch: Dispatch<any>, playerRow: PlayerRow) {
    let props = {
        url: PLAYERS_URL + "/" + playerRow.player.id,
        method: 'PUT',
        body: JSON.stringify({name: playerRow.name}),
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    if (data === true) {
                        dispatch({type: UPDATE_PLAYER, row: playerRow})
                    }
                })
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function deletePlayer(dispatch: Dispatch<any>, id: number) {
    let props = {
        url: PLAYERS_URL + "/" + id,
        method: 'DELETE',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.text().then(value => {
                    if (value == "true") {
                        dispatch({type: DELETE_PLAYER, data: id})
                    } else {
                        dispatch({type: SET_ERROR_MESSAGE,
                            message: "Нельзя удалить игрока, состоящего в команде и для которой есть результаты"})
                    }
                })
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function addTeam(dispatch: Dispatch<any>, nameTeam: string, players: Array<Player>) {
    let props = {
        url: TEAMS_URL,
        method: 'POST',
        body: JSON.stringify({name: nameTeam, players: players}),
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const team = data as Team
                    dispatch({type: ADD_TEAM, data: team})
                })
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function deleteTeam(dispatch: Dispatch<any>, id: number) {
    let props = {
        url: TEAMS_URL + "/" + id,
        method: 'DELETE',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                dispatch({type: DELETE_TEAM, data: id})
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function addGameSession(dispatch: Dispatch<any>, gameSessionDto: GameSessionDto) {
    let props = {
        url: GAME_SESSION_URL,
        method: 'POST',
        body: JSON.stringify(gameSessionDto),
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const resultDto = data as GameSessionDto
                    dispatch({type: ADD_GAME_SESSION, data: resultDto})
                })
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function deleteGameSession(dispatch: Dispatch<any>, id: number) {
    let props = {
        url: GAME_SESSION_URL + "/" + id,
        method: 'DELETE',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                dispatch({type: DELETE_GAME_SESSION, data: id})
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function getStatisticsPlayer(dispatch: Dispatch<any>, id: number) {
    let props = {
        url: STATISTICS_PLAYER_URL + "/" + id,
        method: 'GET',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const gameSessionDtos = data as Array<GameSessionDto>
                    dispatch({type: STATISTICS_PLAYER, data: gameSessionDtos, playerId: id})
                })
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}

export function getStatisticsPopularGames(dispatch: Dispatch<any>) {
    let props = {
        url: STATISTICS_POPULAR_GAMES_URL,
        method: 'GET',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const gameSessionMonthDtos = data as Array<GameSessionMonthDto>
                    dispatch({type: STATISTICS_SESSION_MONTH, data: gameSessionMonthDtos})
                })
            }
        },
        userId: -1,
        userKey: ""
    }
    baseFetch(dispatch, props)
}