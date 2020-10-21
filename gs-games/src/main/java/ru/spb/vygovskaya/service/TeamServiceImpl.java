package ru.spb.vygovskaya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spb.vygovskaya.domain.Player;
import ru.spb.vygovskaya.domain.Team;
import ru.spb.vygovskaya.dto.PlayerDto;
import ru.spb.vygovskaya.dto.TeamDto;
import ru.spb.vygovskaya.repository.TeamRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;
    private final PlayerService playerService;

    @Autowired
    public TeamServiceImpl(TeamRepository teamRepository, PlayerService playerService) {
        this.teamRepository = teamRepository;
        this.playerService = playerService;
    }

    @Override
    public List<TeamDto> findAll() {
        List<Team> teams = teamRepository.findAll();
        List<TeamDto> result = new ArrayList<>();
        teams.stream().forEach(team -> result.add(new TeamDto(team)));
        return result;
    }

    @Override
    public TeamDto save(TeamDto teamDto) {
        Team team = new Team(teamDto.getName());
        Team teamSave = teamRepository.save(team);
        teamDto.getPlayers().stream().forEach(playerInfoDto -> {
            Optional<Player> player = playerService.findById(playerInfoDto.getId());
            player.ifPresent(player1 -> {
                teamSave.addPlayer(player1);
                player1.addTeam(teamSave);
            });
        });
        Team teamSave2 = teamRepository.save(teamSave);
        return new TeamDto(teamSave2);
    }

    @Override
    public Optional<Team> findById(Long id) {
        return teamRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        teamRepository.deleteById(id);
    }

    @Override
    public boolean update(TeamDto team) {
        return false;
    }
}
