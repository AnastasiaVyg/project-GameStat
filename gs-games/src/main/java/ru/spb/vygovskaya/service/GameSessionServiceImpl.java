package ru.spb.vygovskaya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spb.vygovskaya.domain.GameResult;
import ru.spb.vygovskaya.domain.GameSession;
import ru.spb.vygovskaya.dto.GameSessionDto;
import ru.spb.vygovskaya.repository.GameResultRepository;
import ru.spb.vygovskaya.repository.GameSessionRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameSessionServiceImpl implements GameSessionService{

    private final GameSessionRepository gameSessionRepository;
    private final GameResultRepository gameResultRepository;

    @Autowired
    public GameSessionServiceImpl(GameSessionRepository gameSessionRepository, GameResultRepository gameResultRepository) {
        this.gameSessionRepository = gameSessionRepository;
        this.gameResultRepository = gameResultRepository;
    }

    @Override
    public List<GameSessionDto> findAll() {
//        List<GameResult> gameResults = gameResultRepository.findAll();
        List<GameSession> gameSessions = gameSessionRepository.findAll();
        return gameSessions.stream().map(GameSessionDto::new).collect(Collectors.toList());
    }
}
