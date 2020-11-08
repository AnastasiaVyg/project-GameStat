package ru.spb.vygovskaya.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id = -1;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "user" , targetEntity = Player.class, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Player> players = new ArrayList<>();

    public User() {
    }

    public User(long id, String email) {
        this.id = id;
        this.email = email;
    }

    public User(String email) {
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Player> getPlayers() {
        return players;
    }
}
