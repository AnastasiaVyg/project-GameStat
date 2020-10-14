package ru.spb.vygovskaya.dto;

import ru.spb.vygovskaya.domain.Player;
import ru.spb.vygovskaya.domain.User;

public class PlayerInfoDto {
    private long id;
    private String name;
    private User user;

    public PlayerInfoDto(long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public PlayerInfoDto(Player player){
        this(player.getId(), player.getName(), player.getUser());
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
}
