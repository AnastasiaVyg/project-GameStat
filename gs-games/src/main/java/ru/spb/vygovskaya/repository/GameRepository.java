package ru.spb.vygovskaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spb.vygovskaya.domain.Game;

public interface GameRepository extends JpaRepository<Game, Long> {
}
