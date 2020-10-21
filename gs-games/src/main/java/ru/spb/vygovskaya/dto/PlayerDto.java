package ru.spb.vygovskaya.dto;

import ru.spb.vygovskaya.domain.Player;
import ru.spb.vygovskaya.domain.User;

import java.util.ArrayList;
import java.util.List;

public class PlayerDto {
    private long id = -1;
    private String name;
    private User user;
    private List<TeamInfoDto> teams = new ArrayList<>();

    public PlayerDto() {
    }

    public PlayerDto(long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public PlayerDto(long id, String name, User user, List<TeamInfoDto> teams) {
        this(id, name, user);
        this.teams = teams;
    }

    public PlayerDto(Player player){
        this(player.getId(), player.getName(), player.getUser());
        teams = new ArrayList<>();
        player.getTeams().stream().forEach(team -> teams.add(new TeamInfoDto(team)));
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public User getUser() {
        return user;
    }

    public List<TeamInfoDto> getTeams() {
        return teams;
    }
}
