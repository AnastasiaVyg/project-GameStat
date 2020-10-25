package ru.spb.vygovskaya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.spb.vygovskaya.domain.*;
import ru.spb.vygovskaya.dto.GameSessionDto;
import ru.spb.vygovskaya.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameSessionServiceImpl implements GameSessionService{

    private final GameSessionRepository gameSessionRepository;
    private final GameRepository gameRepository;
    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public GameSessionServiceImpl(GameSessionRepository gameSessionRepository, GameRepository gameRepository,
                                  TeamRepository teamRepository, PlayerRepository playerRepository) {
        this.gameSessionRepository = gameSessionRepository;
        this.gameRepository = gameRepository;
        this.teamRepository = teamRepository;
        this.playerRepository = playerRepository;
    }

    @Override
    public List<GameSessionDto> findAll() {
        List<GameSession> gameSessions = gameSessionRepository.findAll();
        return gameSessions.stream().map(GameSessionDto::new).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public GameSessionDto save(GameSessionDto gameSessionDto) {
        Optional<Game> optionalGame = gameRepository.findById(gameSessionDto.getGameId());
        Optional<Team> optionalTeam = teamRepository.findById(gameSessionDto.getTeamId());
        if (optionalGame.isPresent() && optionalTeam.isPresent()) {
            GameSession gameSession = new GameSession(gameSessionDto.getDate(), optionalGame.get(), optionalTeam.get());
            GameSession saveGameSession = gameSessionRepository.save(gameSession);
            List<GameResult> gameResults = new ArrayList<>();
            gameSessionDto.getResults().forEach(gameResultDto -> {
                Optional<Player> optionalPlayer = playerRepository.findById(gameResultDto.getPlayerId());
                optionalPlayer.ifPresent(player -> {
                    gameResults.add(new GameResult(saveGameSession, player, gameResultDto.getPoints()));
                });
            });
            saveGameSession.setResults(gameResults);
            GameSession save = gameSessionRepository.save(saveGameSession);
            return new GameSessionDto(save);
        }
        return null;
    }

    @Override
    public void deleteById(Long id) {
        gameSessionRepository.deleteById(id);
    }
}
