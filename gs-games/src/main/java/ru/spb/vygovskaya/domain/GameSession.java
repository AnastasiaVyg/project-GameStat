package ru.spb.vygovskaya.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "game_sessions")
public class GameSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id = -1;

    @Column(name = "date")
    private Date date;

    @ManyToOne(targetEntity = Game.class, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne(targetEntity = Team.class, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    private Team team;

//    @ManyToOne(targetEntity = Player.class, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
//    @JoinColumn(name = "winner_id")
//    private Player winner;

    public GameSession() {
    }

    public GameSession(long id, Date date, Game game, Team team) {
        this.id = id;
        this.date = date;
        this.game = game;
        this.team = team;
//        this.winner = winner;
    }

    public GameSession(Date date, Game game, Team team) {
        this.date = date;
        this.game = game;
        this.team = team;
//        this.winner = winner;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

//    public Player getWinner() {
//        return winner;
//    }

//    public void setWinner(Player winner) {
//        this.winner = winner;
//    }
}
