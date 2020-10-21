import {Dispatch} from "react";
import {Game} from "../model/Game";
import {
    ADD_PLAYER, ADD_BOOK, ADD_COMMENT,
    ADD_GAME, DELETE_PLAYER, DELETE_BOOK,
    DELETE_GAME,
    LOAD_PLAYERS,
    LOAD_BOOKS, LOAD_COMMENTS,
    LOAD_GAMES, SHOW_LOGIN_DIALOG, SET_ERROR_MESSAGE,
    UPDATE_PLAYER, UPDATE_BOOK,
    UPDATE_GAME, CLEAR_DATA, LOAD_TEAMS, DELETE_TEAM, ADD_TEAM
} from "./ActionConsts";
import {Player} from "../model/Player";
import {BookDto} from "../model/Book";
import {GameRow} from "../view/GameTable";
import {PlayerRow} from "../view/PlayerTable";
import {BookRow} from "../view/BookTable";
import {Team} from "../model/Team";

const GAMES_URL = '/games'
const PLAYERS_URL = '/players'
const TEAMS_URL = '/teams'
const BOOKS_URL = '/books'

export interface FetchProps {
    url: string
    method: string
    body: string
    responseFunc: { (r: Response): void }
}

function baseFetch(dispatch: Dispatch<any>, props: FetchProps) {
    let responseHandle = (response: Response) => {
        if (response.ok){
            props.responseFunc(response)
        }
        if (response.status === 401) {
            dispatch({type: SHOW_LOGIN_DIALOG, data: true, fetchProps: props})
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

export function loginFetch(dispatch: Dispatch<any>, login: String, password: String, props: FetchProps) {

    fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: "include",
        redirect: "manual",
        body: "username=" + login +"&password=" + password
    }).then(response => {
        console.log(response.status)
        dispatch({type: SHOW_LOGIN_DIALOG, data: false})
        if (response.ok){
            console.log(response.url)
            baseFetch(dispatch, props)
        } else {
            dispatch({type: SHOW_LOGIN_DIALOG, data: true})
        }
    })
}

export function logoutFetch(dispatch: Dispatch<any>) {
    fetch("/logout", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        redirect: "manual"
    }).then(response => {
        dispatch({type: SHOW_LOGIN_DIALOG, data: true})
        dispatch({type: CLEAR_DATA})
    })
}

export function loadGames(dispatch: Dispatch<any>) {
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
        }
    }
    baseFetch(dispatch, props)
}

export function loadPlayers(dispatch: Dispatch<any>) {
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
        }
    }
    baseFetch(dispatch, props)
}

export function loadTeams(dispatch: Dispatch<any>) {
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
        }
    }
    baseFetch(dispatch, props)

}

export function loadBooks(dispatch: Dispatch<any>) {
    let props = {
        url: BOOKS_URL,
        method: 'GET',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const books = data as Array<BookDto>
                    dispatch({type: LOAD_BOOKS, data: books})
                })
            }
        }
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
        }
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
        }
    }
    baseFetch(dispatch, props)
}

export function deleteGame(dispatch: Dispatch<any>, id: string) {
    let props = {
        url: GAMES_URL + "/" + id,
        method: 'DELETE',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                dispatch({type: DELETE_GAME, data: id})
            }
        }
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
        }
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
        }
    }
    baseFetch(dispatch, props)
}

export function deletePlayer(dispatch: Dispatch<any>, id: string) {
    let props = {
        url: PLAYERS_URL + "/" + id,
        method: 'DELETE',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                dispatch({type: DELETE_PLAYER, data: id})
            }
        }
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
        }
    }
    baseFetch(dispatch, props)
}

export function deleteTeam(dispatch: Dispatch<any>, id: string) {
    let props = {
        url: TEAMS_URL + "/" + id,
        method: 'DELETE',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                dispatch({type: DELETE_TEAM, data: id})
            }
        }
    }
    baseFetch(dispatch, props)
}

export function addBook(dispatch: Dispatch<any>, bookRow: BookRow) {
    let props = {
        url: BOOKS_URL,
        method: 'POST',
        body: JSON.stringify({name: bookRow.name, authorId: bookRow.author, genreId: bookRow.genre, year: bookRow.year}),
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const bookDto = data as BookDto
                    dispatch({type: ADD_BOOK, data: bookDto})
                })
            }
        }
    }
    baseFetch(dispatch, props)
}

export function updateBook(dispatch: Dispatch<any>, bookRow: BookRow) {
    let props = {
        url: BOOKS_URL + "/" + bookRow.book.id,
        method: 'PUT',
        body: JSON.stringify({name: bookRow.name, authorId: bookRow.author, genreId: bookRow.genre, year: bookRow.year}),
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    if (data === true) {
                        dispatch({type: UPDATE_BOOK, row: bookRow})
                    }
                })
            }
        }
    }
    baseFetch(dispatch, props)
}

export function deleteBook(dispatch: Dispatch<any>, id: string) {
    let props = {
        url: BOOKS_URL + "/" + id,
        method: 'DELETE',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                dispatch({type: DELETE_BOOK, data: id})
            }
        }
    }
    baseFetch(dispatch, props)
}

export function loadComments(dispatch: Dispatch<any>, id: string) {
    let props = {
        url: BOOKS_URL + "/" + id + "/comments",
        method: 'GET',
        body: "",
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    const comments = data as Array<string>
                    dispatch({type: LOAD_COMMENTS, comments: comments, id: id})
                })
            }
        }
    }
    baseFetch(dispatch, props)
}

export function addComment(dispatch: Dispatch<any>, bookId: string, comment: string) {
    let props = {
        url: BOOKS_URL + "/" + bookId + "/comments",
        method: 'POST',
        body: JSON.stringify({comment: comment}),
        responseFunc: (response: Response) => {
            if (response.ok) {
                response.json().then(data => {
                    if (data === true) {
                        dispatch({type: ADD_COMMENT, comment: comment, id: bookId})
                    }
                })
            }
        }
    }
    baseFetch(dispatch, props)
}