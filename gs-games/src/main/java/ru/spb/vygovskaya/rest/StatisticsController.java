package ru.spb.vygovskaya.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ru.spb.vygovskaya.domain.GameResult;
import ru.spb.vygovskaya.dto.GameSessionDto;
import ru.spb.vygovskaya.dto.GameSessionMonthDto;
import ru.spb.vygovskaya.repository.GameResultRepository;
import ru.spb.vygovskaya.repository.GameSessionRepository;
import ru.spb.vygovskaya.service.GameSessionService;
import ru.spb.vygovskaya.service.StatisticsService;

import java.util.Date;
import java.util.List;

@RestController
public class StatisticsController {

    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }


//    @GetMapping("/statistics/teams/{id}")
//    public List<GameSessionDto> getStatisticsTeamToPeriod(@PathVariable Long id){
//        Date d1 = new Date(1598560344000L);
//        Date d2 = new Date();
//        return statisticsService.getGameSessionByTeamByPeriod(id, d1, d2);
//    }

    @GetMapping("/statistics/games")
    public List<GameSessionMonthDto> getStatisticsGamesCountByMonth() {
        return statisticsService.countGamesResultByMonth();
    }

//    @GetMapping("/statistics/teams/{id}/games/{id2}")
//    @GetMapping("/statistics/games/teams/{id}")
//    public List<GameSessionDto> getStatisticsTeamAndGame(@PathVariable Long id){
//        return statisticsService.getGameSessionByTeamAndGame(id, 2);
//    }

    @GetMapping("/statistics/player/{id}")
    public List<GameSessionDto> getStatisticsPlayer(@PathVariable Long id){
        return statisticsService.getAllGameResultByPlayer(id);
    }
}
