package ru.spb.vygovskaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spb.vygovskaya.domain.GameResult;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {
}
