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

    @Autowired
    public TeamServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
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
        return new TeamDto(teamSave);
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
