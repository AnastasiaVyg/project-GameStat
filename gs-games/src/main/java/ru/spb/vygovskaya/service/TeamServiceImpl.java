package ru.spb.vygovskaya.service;

import com.netflix.hystrix.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.spb.vygovskaya.domain.Player;
import ru.spb.vygovskaya.domain.Team;
import ru.spb.vygovskaya.dto.TeamDto;
import ru.spb.vygovskaya.repository.PlayerRepository;
import ru.spb.vygovskaya.repository.TeamRepository;

import java.util.*;

@Service
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public TeamServiceImpl(TeamRepository teamRepository, PlayerRepository playerRepository) {
        this.teamRepository = teamRepository;
        this.playerRepository = playerRepository;
    }

    @Override
    public List<TeamDto> findAll() {
        com.netflix.hystrix.HystrixCommand<List<TeamDto>> cmd = new HystrixCommand<>(Keys.jdbcSetter) {
            private String guid = UUID.randomUUID().toString();
            @Override
            protected List<TeamDto> run() throws Exception {
               List<Team> teams = teamRepository.findAll();
               List<TeamDto> result = new ArrayList<>();
               teams.forEach(team -> result.add(new TeamDto(team)));
               return result;
            }

            @Override
            protected List<TeamDto> getFallback() {
                return Collections.emptyList();
            }
        };
        return cmd.execute();
    }

    @Transactional
    @Override
    public TeamDto save(TeamDto teamDto) {
        Team team = new Team(teamDto.getName());
        Team teamSave = teamRepository.save(team);
        teamDto.getPlayers().forEach(playerInfoDto -> {
            Optional<Player> player = playerRepository.findById(playerInfoDto.getId());
            player.ifPresent(player1 -> {
                teamSave.addPlayer(player1);
            });
        });
        Team teamSave2 = teamRepository.save(teamSave);
        return new TeamDto(teamSave2);
    }

    @Override
    public Optional<Team> findById(Long id) {
        return teamRepository.findById(id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        teamRepository.deleteById(id);
    }

    @Transactional
    @Override
    public boolean update(TeamDto team) {
        return false;
    }
}
