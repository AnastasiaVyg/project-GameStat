package ru.spb.vygovskaya.service;

import ru.spb.vygovskaya.dto.GameSessionDto;
import ru.spb.vygovskaya.dto.GameSessionMonthDto;

import java.util.Date;
import java.util.List;

public interface StatisticsService {
    List<GameSessionDto> getGameSessionByTeamByPeriod(long teamId, Date startDate, Date endDate);
    List<GameSessionDto> getGameSessionByTeamAndGame(long teamId, long gameId);
    List<GameSessionMonthDto> countGamesResultByMonth();
    List<GameSessionDto> getAllGameResultByPlayer(long id);
}
