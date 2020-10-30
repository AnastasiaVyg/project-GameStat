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
        {name: 'January', number: 1},
        {name: 'February', number: 2},
        {name: 'March', number: 3},
        {name: 'April', number: 4},
        {name: 'May', number: 5},
        {name: 'June', number: 6},
        {name: 'July', number: 7},
        {name: 'August', number: 8},
        {name: 'September', number: 9},
        {name: 'October', number: 10},
        {name: 'November', number: 11},
        {name: 'December', number: 12}
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

    const data = [
        {
            name: 'Page A', uv: 4000, pv: 2400,
        },
        {
            name: 'Page B', uv: 3000, pv: 1398,
        },
        {
            name: 'Page C', uv: 2000, pv: 9800,
        },
        {
            name: 'Page D', uv: 2780, pv: 3908,
        },
        {
            name: 'Page E', uv: 1890, pv: 4800,
        },
        {
            name: 'Page F', uv: 2390, pv: 3800,
        },
        {
            name: 'Page G', uv: 3490, pv: 4300,
        },
    ];

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