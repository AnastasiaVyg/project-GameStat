package ru.spb.vygovskaya.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id = -1;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @JoinTable (name="teams_players",
            joinColumns=@JoinColumn(name="team_id"),
            inverseJoinColumns=@JoinColumn(name="player_id"))
    private List<Player> players = new ArrayList<>();

    public Team() {
    }

    public Team(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Team(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public void addPlayer(Player player){
        this.players.add(player);
    }
}
