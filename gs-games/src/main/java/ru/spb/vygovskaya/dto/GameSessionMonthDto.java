package ru.spb.vygovskaya.dto;

public class GameSessionMonthDto {
    private int month;
    private long gameId;
    private int count;

    public GameSessionMonthDto() {
    }

    public GameSessionMonthDto(int month, long gameId, int count) {
        this.month = month;
        this.gameId = gameId;
        this.count = count;
    }

    public int getMonth() {
        return month;
    }

    public long getGameId() {
        return gameId;
    }

    public int getCount() {
        return count;
    }
}
