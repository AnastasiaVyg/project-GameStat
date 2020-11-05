package ru.spb.vygovskaya.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id = -1;

    @Column(name = "guid")
    private UUID uuid;

    @Column(name = "email")
    private String email;

    @Column(name = "user_name")
    private String name;

    @Column(name = "time_authent")
    private Timestamp authenticationTime;

    public User() {
    }

    public User(String name, String email){
        this.name = name;
        this.email = email;
        this.uuid = UUID.randomUUID();
        authenticationTime = new Timestamp(System.currentTimeMillis());
    }

    public long getId() {
        return id;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getAuthenticationTime() {
        return authenticationTime;
    }

    public void setAuthenticationTime(Timestamp authenticationTime) {
        this.authenticationTime = authenticationTime;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", uuid=" + uuid +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", authenticationTime=" + authenticationTime +
                '}';
    }
}