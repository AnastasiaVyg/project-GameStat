import {Game} from "../model/Game";
import {Player} from "../model/Player";
import {GameSession, GameSessionDto, Result} from "../model/GameSession";
import {Team} from "../model/Team";
import {
    ADD_PLAYER,
    ADD_GAME_SESSION,
    ADD_GAME,
    CLEAR_ERROR_MESSAGE,
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
    SHOW_LOGIN_DIALOG,
    CLEAR_DATA,
    LOAD_TEAMS,
    ADD_TEAM,
    DELETE_TEAM,
    STATISTICS_PLAYER,
    STATISTICS_SESSION_MONTH, AUTHENTICATION
} from "./ActionConsts";
import {GameRow} from "../view/GameTable";
import {PlayerRow} from "../view/PlayerTable";
import {GameSessionRow} from "../view/GameSessionTable";
import {FetchProps} from "./Actions";
import {TeamRow} from "../view/TeamTable";
import {GameSessionMonth, GameSessionMonthDto} from "../model/GameSessionMonth";

export interface StatisticsPlayer {
    results: Array<GameSession>
    player: Player

}

export interface UserData {
    name: String
    id: number
    key: string
    isAuthorization: boolean
}

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
    statisticsPlayer: StatisticsPlayer
    statisticsMonth: Array<GameSessionMonth>
    isLoadedStatisticsMonth: boolean
    userData: UserData
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
    fetchProps: {url: "", method:"", body:"", responseFunc: r => {}, userId: -1, userKey: ""},
    statisticsPlayer: {results:[], player: Player.empty},
    statisticsMonth: [],
    isLoadedStatisticsMonth: false,
    userData: {name: "", id: -1, key: "", isAuthorization: false}
}

export function storable(state: AppState = initialState, action: any): AppState {

    switch (action.type) {
        case AUTHENTICATION: {
            const userData = action.data as UserData
            return setAuthentication(state, userData)
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
            return loadedGameSessions(state, booksDto)
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
            const id = action.data as number
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
        case DELETE_PLAYER: {
            const id = action.data as number
            return deletePlayer(state, id)
        }
        case ADD_TEAM: {
            const team = action.data as Team
            return addTeam(state, team)
        }
        case DELETE_TEAM: {
            const id = action.data as number
            return deleteTeam(state, id)
        }
        case ADD_GAME_SESSION: {
            const gameSessionDto = action.data as GameSessionDto
            return addGameSession(state, gameSessionDto)
        }
        // case UPDATE_GAME_SESSION: {
        //     const bookRow = action.row as GameSessionRow
        //     return updateBook(state, bookRow)
        // }
        case DELETE_GAME_SESSION: {
            const id = action.data as number
            return deleteGameSession(state, id)
        }
        case SET_ERROR_MESSAGE: {
            const message = action.message
            return setErrorMessage(state, message)
        }
        case CLEAR_ERROR_MESSAGE: {
            return setErrorMessage(state, "")
        }
        case STATISTICS_PLAYER: {
            const gameSessionsDto = action.data as Array<GameSessionDto>
            const playerId = action.playerId
            return setStatisticsPlayer(state, gameSessionsDto, playerId)
        }
        case STATISTICS_SESSION_MONTH: {
            const gameSessionMonthDtos = action.data as Array<GameSessionMonthDto>
            return setStatisticsGameSessionMonth(state, gameSessionMonthDtos)
        }
        default:
            return state
    }
}

function setAuthentication(state:AppState, userData: UserData): AppState {
    return {...state, userData: userData};
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
        fetchProps: state.fetchProps,
        statisticsPlayer: {results:[], player: Player.empty},
        statisticsMonth: [],
        isLoadedStatisticsMonth: false,
        userData: {name: "", id: -1, key: "", isAuthorization: false}
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

function loadedGameSessions(state: AppState, gameSessionsDto: Array<GameSessionDto>): AppState {
    if (state.isLoadedGames === false || state.isLoadedPlayers === false || state.isLoadedTeams === false){
        return state
    }
    const gameSessions: Array<GameSession> = []
    gameSessionsDto.forEach(gameSessionDto => {
        const gameSession = createGameSession(state, gameSessionDto)
        if (gameSession != null)
            gameSessions.push(gameSession)
    })
    return {...state, gameSessions: [...gameSessions], isLoadedGameSessions: true}
}

function createGameSession(state: AppState, gameSessionDto: GameSessionDto): GameSession | null{
    const games = state.games
    const players = state.players
    const teams = state.teams
    const gameIndex = getIndex(games, gameSessionDto.gameId)
    const teamIndex = getIndex(teams, gameSessionDto.teamId)
    if (gameIndex === -1 || teamIndex === -1)
        return null
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
    return new GameSession(gameSessionDto.id, date, games[gameIndex], teams[teamIndex], results)
}

function addGame(state: AppState, genre: Game): AppState {
    return {...state, games: [...state.games, genre]}
}

function updateGame(state: AppState, id: number, name: string): AppState {
    const games = state.games
    const index = getIndex(games, id)
    games[index].name = name
    return {...state, games: [...games]}
}

function deleteGame(state: AppState, id: number): AppState {
    const games = state.games
    const index = getIndex(games, id)
    const newGames = []
    for (let i = 0; i < games.length; i++) {
        if (i != index) {
            newGames.push(games[i])
        }
    }

    return {...state, games: newGames}
}

function addPlayer(state: AppState, author: Player): AppState {
    return {...state, players: [...state.players, author]}
}

function updatePlayer(state: AppState, id: number, name: string): AppState {
    const players = state.players
    const index = getIndex(players, id)
    players[index].name = name
    return {...state, players: [...players]}
}

interface Identifier {
    id: number
}

function getIndex(arr: Array<Identifier>, id: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1;
}

function deletePlayer(state: AppState, id: number): AppState {
    const players = state.players
    const index = getIndex(players, id)
    const newPlayers = []
    for (let i = 0; i < players.length; i++) {
        if (i != index) {
            newPlayers.push(players[i])
        }
    }
    return {...state, players: [...newPlayers], errorMessage: ""}
}

function addTeam(state: AppState, team: Team): AppState {
    return {...state, teams: [...state.teams, team], errorMessage: ""}
}

function deleteTeam(state: AppState, id: number): AppState {
    const teams = state.teams
    const index = getIndex(teams, id)
    const newTeams = []
    for (let i = 0; i < teams.length; i++) {
        if (i != index) {
            newTeams.push(teams[i])
        }
    }
    return {...state, teams: newTeams}
}

function addGameSession(state: AppState, gameSessionDto: GameSessionDto): AppState {
    const gameSession = createGameSession(state, gameSessionDto)
    if (gameSession != null){
        state.gameSessions.push(gameSession)
    }
    return {...state, gameSessions: [...state.gameSessions], errorMessage: "", isLoadedStatisticsMonth: false}
}

function deleteGameSession(state: AppState, id: number): AppState {
    const gameSessions = state.gameSessions
    const index = getIndex(gameSessions, id)
    const newSessions = []
    for (let i = 0; i < gameSessions.length; i++) {
        if (i != index) {
            newSessions.push(gameSessions[i])
        }
    }
    return {...state, gameSessions: newSessions, isLoadedStatisticsMonth: false}
}

function setStatisticsPlayer(state: AppState, gameSessionsDto: Array<GameSessionDto>, playerId: number): AppState {
    const gameSessions: Array<GameSession> = []
    gameSessionsDto.forEach(gameSessionDto => {
        const gameSession = createGameSession(state, gameSessionDto)
        if (gameSession != null)
            gameSessions.push(gameSession)
    })
    const players = state.players
    const index = getIndex(players, playerId);
    return {...state, statisticsPlayer: {results: [...gameSessions], player: players[index]}}
}

function setStatisticsGameSessionMonth(state: AppState, gameSessionMonthDtos: Array<GameSessionMonthDto>): AppState {
    const games = state.games
    const gameSessionMonths: Array<GameSessionMonth> = []
    gameSessionMonthDtos.forEach(gameSessionMonthDto => {
        const index = getIndex(games, gameSessionMonthDto.gameId)
        const game = games[index]
        gameSessionMonths.push(new GameSessionMonth(gameSessionMonthDto.month, game,  gameSessionMonthDto.count))
    })
    return {...state, statisticsMonth: [...gameSessionMonths], isLoadedStatisticsMonth: true}
}