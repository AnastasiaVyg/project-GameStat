import {Game} from "../model/Game";
import {Player} from "../model/Player";
import {Book, BookDto} from "../model/Book";
import {Team} from "../model/Team";
import {
    ADD_PLAYER,
    ADD_BOOK, ADD_COMMENT,
    ADD_GAME, CLEAR_ERROR_MESSAGE,
    DELETE_PLAYER,
    DELETE_BOOK,
    DELETE_GAME, LOAD_PLAYERS, LOAD_BOOKS, LOAD_COMMENTS, LOAD_GAMES, SET_ERROR_MESSAGE,
    UPDATE_PLAYER, UPDATE_BOOK,
    UPDATE_GAME, SHOW_LOGIN_DIALOG, CLEAR_DATA, LOAD_TEAMS, ADD_TEAM
} from "./ActionConsts";
import {GameRow} from "../view/GameTable";
import {PlayerRow} from "../view/PlayerTable";
import {BookRow} from "../view/BookTable";
import {FetchProps} from "./Actions";

export interface AppState {
    games: Array<Game>
    players: Array<Player>
    teams: Array<Team>
    books: Array<Book>
    isLoadedGames: boolean
    isLoadedPlayers: boolean
    isLoadedTeams: boolean
    isLoadedBooks: boolean
    errorMessage: string
    isShowLoginDialog: boolean
    fetchProps: FetchProps
}

const initialState: AppState = {
    games: [],
    players: [],
    teams: [],
    books: [],
    isLoadedGames: false,
    isLoadedPlayers: false,
    isLoadedTeams: false,
    isLoadedBooks: false,
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
        case LOAD_BOOKS: {
            const booksDto = action.data as Array<BookDto>
            return loadedBooks(state, booksDto)
        }
        case LOAD_COMMENTS: {
            const comments = action.comments as Array<string>
            const bookId = action.id
            return loadedComments(state, comments, bookId)
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
        case DELETE_PLAYER: {
            const id = action.data as string
            return deletePlayer(state, id)
        }
        case ADD_TEAM: {
            const team = action.data as Team
            return addTeam(state, team)
        }
        case ADD_BOOK: {
            const bookDto = action.data as BookDto
            return addBook(state, bookDto)
        }
        case UPDATE_BOOK: {
            const bookRow = action.row as BookRow
            return updateBook(state, bookRow)
        }
        case DELETE_BOOK: {
            const id = action.data as string
            return deleteBook(state, id)
        }
        case ADD_COMMENT: {
            const bookId = action.id as string
            const comment = action.comment as string
            return addComment(state, comment, bookId)
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
        books: [],
        isLoadedGames: false,
        isLoadedPlayers: false,
        isLoadedTeams: false,
        isLoadedBooks: false,
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

function loadedBooks(state: AppState, booksDto: Array<BookDto>): AppState {
    if (state.isLoadedGames === false || state.isLoadedPlayers === false){
        return state
    }
    const genres = state.games
    const authors = state.players
    const books: Array<Book> = []
    booksDto.forEach(bookDto => {
        const genreIndex = getIndex(genres, bookDto.genreId)
        const authorIndex = getIndex(authors, bookDto.authorId)
        if (genreIndex === -1 || authorIndex === -1)
            return
        const book = new Book(bookDto.id, bookDto.name, authors[authorIndex], genres[genreIndex], bookDto.year)
        books.push(book)
    })
    return {...state, books: [...books], isLoadedBooks: true}
    // return {
    //     players: state.players,
    //     games: state.games,
    //     books: books,
    //     isLoadedGames: state.isLoadedGames,
    //     isLoadedPlayers: state.isLoadedPlayers,
    //     isLoadedTeams: state.isLoadedTeams,
    //     isLoadedBooks: true,
    //     errorMessage: "",
    //     isShowLoginDialog: state.isShowLoginDialog,
    //     fetchProps: state.fetchProps
    // }
}

function loadedComments(state: AppState, comments: Array<string>, bookId: string): AppState{
    const books = state.books
    const bookIndex = getIndex(books, bookId)
    books[bookIndex].comments = comments
    books[bookIndex].isLoadedComments = true
    return {...state, books: [...books]}
}

function addComment(state: AppState, comment: string, bookId: string): AppState{
    const books = state.books
    const bookIndex = getIndex(books, bookId)
    books[bookIndex].addComment(comment)
    return {...state, books: [...books]}
}

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

    const books = state.books
    const newBooks = []
    for (let i = 0; i< books.length; i++){
        if (books[i].genre.id != id){
            newBooks.push(books[i])
        }
    }
    return {...state, games: newGenres, books: newBooks}
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

function deletePlayer(state: AppState, id: string): AppState {
    const authors = state.players
    const index = getIndex(authors, id)
    const newAuthors = []
    for (let i = 0; i < authors.length; i++) {
        if (i != index) {
            newAuthors.push(authors[i])
        }
    }

    const books = state.books
    const newBooks = []
    for (let i = 0; i< books.length; i++){
        if (books[i].author.id != id){
            newBooks.push(books[i])
        }
    }
    return {...state, players: [...newAuthors], books: [...newBooks], errorMessage: ""}
    // return {
    //     players: newAuthors,
    //     games: state.games,
    //     books: newBooks,
    //     isLoadedGames: state.isLoadedGames,
    //     isLoadedPlayers: state.isLoadedPlayers,
    //     isLoadedTeams: state.isLoadedTeams,
    //     isLoadedBooks: state.isLoadedBooks,
    //     errorMessage: "",
    //     isShowLoginDialog: state.isShowLoginDialog,
    //     fetchProps: state.fetchProps
    // }
}

function addTeam(state: AppState, team: Team): AppState {
    return {...state, teams: [...state.teams, team], errorMessage: ""}
}

function addBook(state: AppState, bookDto: BookDto): AppState {
    const authors = state.players
    const genres = state.games
    const author = getAuthor(authors, bookDto.authorId)
    const genre = getGenre(genres, bookDto.genreId)
    const book = new Book(bookDto.id, bookDto.name, author, genre, bookDto.year)
    return {...state, games: [...genres], players: [...authors], books: [...state.books, book], errorMessage: ""}
    // return {
    //     games: genres,
    //     players: authors,
    //     books: [...state.books, book],
    //     isLoadedGames: state.isLoadedGames,
    //     isLoadedPlayers: state.isLoadedPlayers,
    //     isLoadedTeams: state.isLoadedTeams,
    //     isLoadedBooks: state.isLoadedBooks,
    //     errorMessage: "",
    //     isShowLoginDialog: state.isShowLoginDialog,
    //     fetchProps: state.fetchProps
    // }
}

function updateBook(state: AppState, row: BookRow): AppState {
    const authors = state.players
    const genres = state.games
    const books = state.books

    const author = getAuthor(authors, row.author as unknown as string)
    const genre = getGenre(genres, row.genre as unknown as string)

    const bookIndex = getIndex(books, row.book.id)
    const book = books[bookIndex]
    book.year = Number.parseInt(row.year as unknown as string)
    book.name = row.name
    book.author = author
    book.genre = genre

    return {...state, games: genres, players: authors, books: [...books], errorMessage: ""}

    // return {
    //     games: genres,
    //     players: authors,
    //     books: [...books],
    //     isLoadedGames: state.isLoadedGames,
    //     isLoadedPlayers: state.isLoadedPlayers,
    //     isLoadedTeams: state.isLoadedTeams,
    //     isLoadedBooks: state.isLoadedBooks,
    //     errorMessage: "",
    //     isShowLoginDialog: state.isShowLoginDialog,
    //     fetchProps: state.fetchProps
    // }
}

function getAuthor(authors: Player[], id: string): Player {
    const authorIndex = getIndex(authors, id)
    return authors[authorIndex]
}

function getGenre(genres: Game[], id: string): Game {
    const genreIndex = getIndex(genres, id)
    return genres[genreIndex]
}

function deleteBook(state: AppState, id: string): AppState {
    const books = state.books
    const index = getIndex(books, id)
    const newBooks = []
    for (let i = 0; i < books.length; i++) {
        if (i != index) {
            newBooks.push(books[i])
        }
    }
    return {...state, books: newBooks}
}