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

    @Column(name = "autorize_key")
    private long autorizeKey;

    @OneToMany(mappedBy = "user" , targetEntity = Player.class, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Player> players = new ArrayList<>();

    public User() {
    }

    public User(long id, long autorizeKey) {
        this.id = id;
        this.autorizeKey = autorizeKey;
    }

    public User(long autorizeKey) {
        this.autorizeKey = autorizeKey;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getAutorizeKey() {
        return autorizeKey;
    }

    public void setAutorizeKey(long autorizeKey) {
        this.autorizeKey = autorizeKey;
    }

    public List<Player> getPlayers() {
        return players;
    }
}
