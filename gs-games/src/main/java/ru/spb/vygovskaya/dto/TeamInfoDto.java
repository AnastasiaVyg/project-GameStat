package ru.spb.vygovskaya.dto;

import ru.spb.vygovskaya.domain.Team;

public class TeamInfoDto {
    private long id;
    private String name;

    public TeamInfoDto(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public TeamInfoDto(Team team){
        this(team.getId(), team.getName());
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
