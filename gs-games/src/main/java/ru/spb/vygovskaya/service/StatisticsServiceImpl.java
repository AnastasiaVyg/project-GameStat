package ru.spb.vygovskaya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spb.vygovskaya.domain.*;
import ru.spb.vygovskaya.dto.GameSessionDto;
import ru.spb.vygovskaya.dto.GameSessionMonthDto;
import ru.spb.vygovskaya.repository.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StatisticsServiceImpl implements StatisticsService{

    private final GameSessionRepository gameSessionRepository;
    private final TeamRepository teamRepository;
    private final GameRepository gameRepository;
    private final GameResultRepository gameResultRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public StatisticsServiceImpl(GameSessionRepository gameSessionRepository, TeamRepository teamRepository, GameRepository gameRepository,
                                 GameResultRepository gameResultRepository, PlayerRepository playerRepository) {
        this.gameSessionRepository = gameSessionRepository;
        this.teamRepository = teamRepository;
        this.gameRepository = gameRepository;
        this.gameResultRepository = gameResultRepository;
        this.playerRepository = playerRepository;
    }

    @Override
    public List<GameSessionDto> getGameSessionByTeamByPeriod(long teamId, Date startDate, Date endDate) {
        Optional<Team> teamOptional = teamRepository.findById(teamId);
        if (teamOptional.isPresent()) {
            List<GameSession> allByTeamAndDateBetween = gameSessionRepository.findAllByTeamAndDateBetween(teamOptional.get(), startDate, endDate);
            return allByTeamAndDateBetween.stream().map(gameSession -> new GameSessionDto(gameSession)).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public List<GameSessionDto> getGameSessionByTeamAndGame(long teamId, long gameId) {
        Optional<Team> teamOptional = teamRepository.findById(teamId);
        Optional<Game> gameOptional = gameRepository.findById(gameId);
        if (teamOptional.isPresent() && gameOptional.isPresent()){
            List<GameSession> allByTeamAndGame = gameSessionRepository.findAllByTeamAndGame(teamOptional.get(), gameOptional.get());
            return allByTeamAndGame.stream().map(gameSession -> new GameSessionDto(gameSession)).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public List<GameSessionMonthDto> countGamesResultByMonth() {
        return gameSessionRepository.countGamesResultByMonth();
    }

    @Override
    public List<GameSessionDto> getAllGameResultByPlayer(long id) {
        Optional<Player> playerOptional = playerRepository.findById(id);
        if (playerOptional.isEmpty()){
            return new ArrayList<>();
        }

        List<GameResult> gameResults = gameResultRepository.findAllByPlayer(playerOptional.get());
        return gameResults.stream().map(gameResult -> new GameSessionDto(gameResult.getGameSession())).collect(Collectors.toList());
    }
}
