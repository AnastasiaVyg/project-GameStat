package ru.spb.vygovskaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spb.vygovskaya.domain.GameSession;

public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
}
