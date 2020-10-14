package ru.spb.vygovskaya.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spb.vygovskaya.domain.Game;
import ru.spb.vygovskaya.domain.Player;
import ru.spb.vygovskaya.dto.PlayerDto;
import ru.spb.vygovskaya.service.PlayerService;

import java.util.List;

@RestController
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/players")
    public List<PlayerDto> getAllPlayers(){
        return playerService.findAll();
    }

    @PostMapping("/players")
    public PlayerDto addPlayer(@RequestBody PlayerDto player){
        return playerService.save(player);
    }

    @PutMapping("/players/{id}")
    public boolean updatePlayer(@PathVariable Long id, @RequestBody PlayerDto player){
        return playerService.update(player);
    }

    @DeleteMapping("/players/{id}")
    public void deletePlayer(@PathVariable Long id){
        playerService.deleteById(id);
    }
}
