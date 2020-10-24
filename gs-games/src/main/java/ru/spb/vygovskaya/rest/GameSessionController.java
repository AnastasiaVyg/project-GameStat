package ru.spb.vygovskaya.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spb.vygovskaya.domain.GameSession;
import ru.spb.vygovskaya.dto.GameSessionDto;
import ru.spb.vygovskaya.service.GameSessionService;

import java.util.List;

@RestController
public class GameSessionController {
    private final GameSessionService gameSessionService;

    @Autowired
    public GameSessionController(GameSessionService gameSessionService) {
        this.gameSessionService = gameSessionService;
    }

    @GetMapping("/results")
    public List<GameSessionDto> getAllGamesSessions(){
        List<GameSessionDto> res =  gameSessionService.findAll();
        return res;
    }
}
