package ru.spb.vygovskaya.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id = -1;

    @Column(name = "name")
    private String name;

    @ManyToOne(targetEntity = User.class, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable (name="teams_players",
            joinColumns=@JoinColumn(name="player_id"),
            inverseJoinColumns=@JoinColumn(name="team_id"))
    private List<Team> teams = new ArrayList<>();

    public Player() {
    }

    public Player(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Player(String name) {
        this.name = name;
    }

    public Player(long id, String name, User user, List<Team> teams) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.teams = teams;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public void addTeam(Team team){
        this.teams.add(team);
    }
}
