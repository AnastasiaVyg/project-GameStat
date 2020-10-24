package ru.spb.vygovskaya.dto;

import ru.spb.vygovskaya.domain.GameResult;

public class GameResultDto {

    private long id = -1;
    private long playerId;
    private int points;

    public GameResultDto() {
    }

    public GameResultDto(GameResult gameResult){
        this.id = gameResult.getId();
        this.points = gameResult.getPoints();
        this.playerId = gameResult.getPlayer().getId();
    }

    public long getId() {
        return id;
    }

    public long getPlayerId() {
        return playerId;
    }

    public int getPoints() {
        return points;
    }
}
