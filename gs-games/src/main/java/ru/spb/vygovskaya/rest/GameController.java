package ru.spb.vygovskaya.rest;

import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;
import ru.spb.vygovskaya.domain.Game;
import ru.spb.vygovskaya.service.GameService;

import java.sql.SQLException;
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
    public boolean deleteGame(@PathVariable Long id){
        try {
            gameService.deleteById(id);
            return true;
        } catch (DataIntegrityViolationException e){
            e.printStackTrace();
        }
        return false;
    }
}
