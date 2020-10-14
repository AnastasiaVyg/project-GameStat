package ru.spb.vygovskaya.dto;

import ru.spb.vygovskaya.domain.Team;

import java.util.ArrayList;
import java.util.List;

public class TeamDto {
    private long id;
    private String name;
    private List<PlayerInfoDto> players;

    public TeamDto(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public TeamDto(long id, String name, List<PlayerInfoDto> players) {
        this(id, name);
        this.players = players;
    }

    public TeamDto(Team team){
        this(team.getId(), team.getName());
        players = new ArrayList<>();
        team.getPlayers().stream().forEach(player -> players.add(new PlayerInfoDto(player)));
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<PlayerInfoDto> getPlayers() {
        return players;
    }
}
