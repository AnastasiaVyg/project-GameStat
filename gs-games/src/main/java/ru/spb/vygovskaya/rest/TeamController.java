package ru.spb.vygovskaya.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spb.vygovskaya.domain.Game;
import ru.spb.vygovskaya.dto.TeamDto;
import ru.spb.vygovskaya.service.TeamService;

import java.util.List;

@RestController
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService){
        this.teamService = teamService;
    }

    @GetMapping("/teams")
    public List<TeamDto> getAllTeams(){
        return teamService.findAll();
    }

    @PostMapping("/teams")
    public TeamDto addTeam(@RequestBody TeamDto team){
        return teamService.save(team);
    }

    @PutMapping("/teams/{id}")
    public boolean updateTeam(@PathVariable Long id, @RequestBody TeamDto team){
        return teamService.update(team);
    }

    @DeleteMapping("/teams/{id}")
    public void deleteTeam(@PathVariable Long id){
        teamService.deleteById(id);
    }
}
