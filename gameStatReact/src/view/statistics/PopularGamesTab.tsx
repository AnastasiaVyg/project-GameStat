import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {getStatisticsPopularGames} from "../../store/Actions";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/Storable";
import {Game} from "../../model/Game";

export interface MonthResult {
    game: Game
    count: number
}

export interface MonthResults {
    month: string
    results: Array<MonthResult>
}

export default function PopularGamesTab(){
    const dispatch = useDispatch()
    const isLoadedStatisticsMonth = useSelector((state: AppState) => state.isLoadedStatisticsMonth)
    const statisticsPopularGame =  useSelector((state :AppState)  => {return state.statisticsMonth})
    const games = useSelector((state :AppState)  => {return state.games})

    if (!isLoadedStatisticsMonth){
        getStatisticsPopularGames(dispatch)
    }

    const months = [
        {name: 'January'},
        {name: 'February'},
        {name: 'March'},
        {name: 'April'},
        {name: 'May'},
        {name: 'June'},
        {name: 'July'},
        {name: 'August'},
        {name: 'September'},
        {name: 'October'},
        {name: 'November'},
        {name: 'December'}
    ]

    const results: Array<MonthResults> = []
    statisticsPopularGame.forEach(statisticPopularGame => {
        const index = statisticPopularGame.month
        let monthResults = results[index]
        if (monthResults == null){
            monthResults = {month: months[index-1].name, results: []}
            results[index] = monthResults
        }
        monthResults.results.push({game: statisticPopularGame.game, count: statisticPopularGame.count})
    })

    const dataStat: any = []
    results.forEach(result => {
        let jsonData: any = {month: result.month}
        games.forEach(game =>{
            const count = getCount(game, result.results)
            jsonData[game.name] = count
        })
        dataStat.push(jsonData)
    })

    return(
        <BarChart
            width={700}
            height={500}
            data={dataStat}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={games[0].name} fill="#8884d8" />
            <Bar dataKey={games[1].name} fill="#82ca9d" />
            <Bar dataKey={games[2].name} fill="#dd04d6" />
            <Bar dataKey={games[3].name} fill="#12cdfd" />
        </BarChart>
    )
}

function getCount(game: Game, monthResults: MonthResult[]): number {
    let result = 0
    monthResults.forEach(monthResult => {
        if (monthResult.game.id == game.id){
            result = monthResult.count
        }
    })
    return result
}