import {Game} from "../model/Game";
import {Player} from "../model/Player";
import {GameSession, GameSessionDto, Result} from "../model/GameSession";
import {Team} from "../model/Team";
import {
    ADD_PLAYER,
    ADD_GAME_SESSION,
    ADD_GAME, CLEAR_ERROR_MESSAGE,
    DELETE_PLAYER,
    DELETE_GAME_SESSION,
    DELETE_GAME, LOAD_PLAYERS, LOAD_GAME_SESSIONS, LOAD_GAMES, SET_ERROR_MESSAGE,
    UPDATE_PLAYER, UPDATE_GAME_SESSION,
    UPDATE_GAME, SHOW_LOGIN_DIALOG, CLEAR_DATA, LOAD_TEAMS, ADD_TEAM
} from "./ActionConsts";
import {GameRow} from "../view/GameTable";
import {PlayerRow} from "../view/PlayerTable";
import {GameSessionRow} from "../view/GameSessionTable";
import {FetchProps} from "./Actions";
import {TeamRow} from "../view/TeamTable";

export interface AppState {
    games: Array<Game>
    players: Array<Player>
    teams: Array<Team>
    gameSessions: Array<GameSession>
    isLoadedGames: boolean
    isLoadedPlayers: boolean
    isLoadedTeams: boolean
    isLoadedGameSessions: boolean
    errorMessage: string
    isShowLoginDialog: boolean
    fetchProps: FetchProps
}

const initialState: AppState = {
    games: [],
    players: [],
    teams: [],
    gameSessions: [],
    isLoadedGames: false,
    isLoadedPlayers: false,
    isLoadedTeams: false,
    isLoadedGameSessions: false,
    errorMessage: "",
    isShowLoginDialog: false,
    fetchProps: {url: "", method:"", body:"", responseFunc: r => {} }
}

export function storable(state: AppState = initialState, action: any): AppState {

    switch (action.type) {
        case SHOW_LOGIN_DIALOG: {
            const isShowLogin = action.data as boolean
            const fetchProps = action.fetchProps as FetchProps
            return setShowLoginDialog(state, isShowLogin, fetchProps)
        }
        case CLEAR_DATA: {
            return clearData(state)
        }
        case LOAD_GAMES: {
            const games = action.data as Array<Game>
            return loadedGames(state, games);
        }
        case LOAD_PLAYERS: {
            const players = action.data as Array<Player>
            return loadedPlayers(state, players)
        }
        case LOAD_TEAMS: {
            const teams = action.data as Array<Team>
            return loadedTeams(state, teams)
        }
        case LOAD_GAME_SESSIONS: {
            const booksDto = action.data as Array<GameSessionDto>
            return loadedBooks(state, booksDto)
        }
        case ADD_GAME: {
            const game = action.data as Game
            return addGame(state, game)
        }
        case UPDATE_GAME: {
            const gameRow = action.row as GameRow
            return updateGame(state, gameRow.game.id, gameRow.name)
        }
        case DELETE_GAME: {
            const id = action.data as string
            return deleteGame(state, id)
        }
        case ADD_PLAYER: {
            const player = action.data as Player
            return addPlayer(state, player)
        }
        case UPDATE_PLAYER: {
            const playerRow = action.row as PlayerRow
            return updatePlayer(state, playerRow.player.id, playerRow.name)
        }
        // case DELETE_PLAYER: {
        //     const id = action.data as string
        //     return deletePlayer(state, id)
        // }
        case ADD_TEAM: {
            const team = action.data as Team
            return addTeam(state, team)
        }
        // case ADD_GAME_SESSION: {
        //     const bookDto = action.data as GameSessionDto
        //     return addBook(state, bookDto)
        // }
        // case UPDATE_GAME_SESSION: {
        //     const bookRow = action.row as GameSessionRow
        //     return updateBook(state, bookRow)
        // }
        case DELETE_GAME_SESSION: {
            const id = action.data as string
            return deleteGameSession(state, id)
        }
        case SET_ERROR_MESSAGE: {
            const message = action.message
            return setErrorMessage(state, message)
        }
        case CLEAR_ERROR_MESSAGE: {
            return setErrorMessage(state, "")
        }
        default:
            return state
    }
}

function setShowLoginDialog(state: AppState, isShowLogin: boolean, fetchProps: FetchProps): AppState {
    let newFetchProps = state.fetchProps
    if (fetchProps != null){
        newFetchProps = fetchProps
    }
    return {...state, isShowLoginDialog: isShowLogin, fetchProps: newFetchProps}
}

function clearData(state: AppState): AppState {
    return {
        players: [],
        games: [],
        teams: [],
        gameSessions: [],
        isLoadedGames: false,
        isLoadedPlayers: false,
        isLoadedTeams: false,
        isLoadedGameSessions: false,
        errorMessage: "",
        isShowLoginDialog: state.isShowLoginDialog,
        fetchProps: state.fetchProps
    }
}

function setErrorMessage(state: AppState, message: string): AppState {
    return {...state, errorMessage: message}
}

function loadedGames(state: AppState, games: Array<Game>): AppState {
    return {...state, games: games, isLoadedGames: true}
}

function loadedPlayers(state: AppState, authors: Array<Player>): AppState {
    return {...state, players: authors, isLoadedPlayers: true}
}

function loadedTeams(state: AppState, teams: Array<Team>): AppState {
    return {...state, teams: teams, isLoadedTeams: true}
}

function loadedBooks(state: AppState, gameSessionsDto: Array<GameSessionDto>): AppState {
    if (state.isLoadedGames === false || state.isLoadedPlayers === false || state.isLoadedTeams === false){
        return state
    }
    const games = state.games
    const players = state.players
    const teams = state.teams
    const gameSessions: Array<GameSession> = []
    gameSessionsDto.forEach(gameSessionDto => {
        const gameIndex = getIndex(games, gameSessionDto.gameId)
        const teamIndex = getIndex(teams, gameSessionDto.teamId)
        if (gameIndex === -1 || teamIndex === -1)
            return
        const date = new Date(gameSessionDto.date)
        const results: Result [] = gameSessionDto.results.map(result => {
            const playerIndex = getIndex(players, result.playerId)
            // if (playerIndex === -1){
            //     return
            // }
            return {
                player: players[playerIndex],
                points: result.points
            }
        })
        const gameSession = new GameSession(gameSessionDto.id, date, games[gameIndex], teams[teamIndex], results)
        gameSessions.push(gameSession)
    })
    return {...state, gameSessions: [...gameSessions], isLoadedGameSessions: true}
}

// function loadedComments(state: AppState, comments: Array<string>, bookId: string): AppState{
//     const books = state.gameSessions
//     const bookIndex = getIndex(books, bookId)
//     books[bookIndex].comments = comments
//     books[bookIndex].isLoadedComments = true
//     return {...state, gameSessions: [...books]}
// }

// function addComment(state: AppState, comment: string, bookId: string): AppState{
//     const books = state.gameSessions
//     const bookIndex = getIndex(books, bookId)
//     books[bookIndex].addComment(comment)
//     return {...state, gameSessions: [...books]}
// }

function addGame(state: AppState, genre: Game): AppState {
    return {...state, games: [...state.games, genre]}
}

function updateGame(state: AppState, id: string, name: string): AppState {
    const games = state.games
    const index = getIndex(games, id)
    games[index].name = name
    return {...state, games: [...games]}
}

function deleteGame(state: AppState, id: string): AppState {
    const games = state.games
    const index = getIndex(games, id)
    const newGenres = []
    for (let i = 0; i < games.length; i++) {
        if (i != index) {
            newGenres.push(games[i])
        }
    }

    const books = state.gameSessions
    const newBooks = []
    for (let i = 0; i< books.length; i++){
        if (books[i].game.id != id){
            newBooks.push(books[i])
        }
    }
    return {...state, games: newGenres, gameSessions: newBooks}
}

function addPlayer(state: AppState, author: Player): AppState {
    return {...state, players: [...state.players, author]}
}

function updatePlayer(state: AppState, id: string, name: string): AppState {
    const players = state.players
    const index = getIndex(players, id)
    players[index].name = name
    return {...state, players: [...players]}
}

interface Identifier {
    id: string
}

function getIndex(arr: Array<Identifier>, id: string): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1;
}

// function deletePlayer(state: AppState, id: string): AppState {
//     const authors = state.players
//     const index = getIndex(authors, id)
//     const newAuthors = []
//     for (let i = 0; i < authors.length; i++) {
//         if (i != index) {
//             newAuthors.push(authors[i])
//         }
//     }
//
//     const books = state.gameSessions
//     // const newBooks = []
//     // for (let i = 0; i< books.length; i++){
//     //     if (books[i].author.id != id){
//     //         newBooks.push(books[i])
//     //     }
//     // }
//     return {...state, players: [...newAuthors], gameSessions: [...newBooks], errorMessage: ""}
// }

function addTeam(state: AppState, team: Team): AppState {
    return {...state, teams: [...state.teams, team], errorMessage: ""}
}

// function addBook(state: AppState, bookDto: GameSessionDto): AppState {
//     const authors = state.players
//     const genres = state.games
//     const author = getAuthor(authors, bookDto.authorId)
//     const genre = getGenre(genres, bookDto.genreId)
//     const book = new GameSession(bookDto.id, bookDto.name, author, genre, bookDto.year)
//     return {...state, games: [...genres], players: [...authors], gameSessions: [...state.gameSessions, book], errorMessage: ""}
// }

// function updateBook(state: AppState, row: GameSessionRow): AppState {
//     const authors = state.players
//     const genres = state.games
//     const books = state.gameSessions
//
//     const author = getAuthor(authors, row.author as unknown as string)
//     const genre = getGenre(genres, row.genre as unknown as string)
//
//     const bookIndex = getIndex(books, row.book.id)
//     const book = books[bookIndex]
//     book.year = Number.parseInt(row.year as unknown as string)
//     book.name = row.name
//     book.author = author
//     book.game = genre
//
//     return {...state, games: genres, players: authors, gameSessions: [...books], errorMessage: ""}
// }

function getAuthor(authors: Player[], id: string): Player {
    const authorIndex = getIndex(authors, id)
    return authors[authorIndex]
}

function getGenre(genres: Game[], id: string): Game {
    const genreIndex = getIndex(genres, id)
    return genres[genreIndex]
}

function deleteGameSession(state: AppState, id: string): AppState {
    const gameSessions = state.gameSessions
    const index = getIndex(gameSessions, id)
    const newSessions = []
    for (let i = 0; i < gameSessions.length; i++) {
        if (i != index) {
            newSessions.push(gameSessions[i])
        }
    }
    return {...state, gameSessions: newSessions}
}