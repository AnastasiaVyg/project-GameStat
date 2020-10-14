package ru.spb.vygovskaya.service;

import ru.spb.vygovskaya.domain.Team;
import ru.spb.vygovskaya.dto.TeamDto;

import java.util.List;
import java.util.Optional;

public interface TeamService {
    List<TeamDto> findAll();
    TeamDto save(TeamDto team);
    Optional<Team> findById(Long id);
    void deleteById(Long id);
    boolean update(TeamDto team);
}
