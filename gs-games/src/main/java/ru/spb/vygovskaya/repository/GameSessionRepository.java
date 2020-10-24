package ru.spb.vygovskaya.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.spb.vygovskaya.domain.GameSession;

import java.util.List;

public interface GameSessionRepository extends JpaRepository<GameSession, Long> {

    @EntityGraph(value = "game-session-entity-graph")
    @Override
    List<GameSession> findAll();
}
