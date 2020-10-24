package ru.spb.vygovskaya.domain;

import javax.persistence.*;

@Entity
@Table(name = "game_results")
public class GameResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id = -1;

    @ManyToOne(targetEntity = GameSession.class, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @JoinColumn(name = "game_session_id")
    private GameSession gameSession;

    @ManyToOne(targetEntity = Player.class, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @JoinColumn(name = "player_id")
    private Player player;

    @Column(name = "points")
    private int points;

    public GameResult() {
    }

    public GameResult(long id, GameSession gameSession, Player player, int points) {
        this.id = id;
        this.gameSession = gameSession;
        this.player = player;
        this.points = points;
    }

    public GameResult(GameSession gameSession, Player player, int points) {
        this.gameSession = gameSession;
        this.player = player;
        this.points = points;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public GameSession getGameSession() {
        return gameSession;
    }

    public void setGameSession(GameSession gameSession) {
        this.gameSession = gameSession;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
