package ru.spb.vygovskaya.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spb.vygovskaya.domain.Game;
import ru.spb.vygovskaya.service.GameService;

import java.util.List;

@RestController
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/games")
    public List<Game> getAllGames(){
        return gameService.findAll();
    }

    @PostMapping("/games")
    public Game addGame(@RequestBody Game game){
        return gameService.save(game.getName());
    }

    @PutMapping("/games/{id}")
    public boolean updateGame(@PathVariable Long id, @RequestBody Game game){
        return gameService.update(id, game.getName());
    }

    @DeleteMapping("/games/{id}")
    public void deleteGame(@PathVariable Long id){
        gameService.deleteById(id);
    }
}
