package ru.spb.vygovskaya.dto;

import ru.spb.vygovskaya.domain.GameSession;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class GameSessionDto {

    private long id = -1;
    private Date date;
    private long gameId;
    private long teamId;
    private List<GameResultDto> results;

    public GameSessionDto() {
    }

    public GameSessionDto(GameSession gameSession){
        this.id = gameSession.getId();
        this.date = gameSession.getDate();
        this.gameId = gameSession.getGame().getId();
        this.teamId = gameSession.getTeam().getId();
        this.results = gameSession.getResults().stream().map(GameResultDto::new).collect(Collectors.toList());
    }

    public long getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public long getGameId() {
        return gameId;
    }

    public long getTeamId() {
        return teamId;
    }

    public List<GameResultDto> getResults() {
        return results;
    }
}
