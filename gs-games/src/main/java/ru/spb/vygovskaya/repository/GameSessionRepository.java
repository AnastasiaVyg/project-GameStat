package ru.spb.vygovskaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spb.vygovskaya.domain.Game;
import ru.spb.vygovskaya.domain.GameSession;
import ru.spb.vygovskaya.domain.Team;

import java.util.Date;
import java.util.List;

public interface GameSessionRepository extends JpaRepository<GameSession, Long>, GameSessionRepositoryCustom {

//    @EntityGraph(value = "game-session-entity-graph")
    @Override
    List<GameSession> findAll();

    List<GameSession> findAllByTeamAndDateBetween(Team team, Date start, Date end);

    List<GameSession> findAllByTeamAndGame(Team team, Game game);

}
