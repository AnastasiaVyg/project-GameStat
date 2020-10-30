package ru.spb.vygovskaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spb.vygovskaya.domain.GameResult;
import ru.spb.vygovskaya.domain.Player;

import java.util.List;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {

    List<GameResult> findAllByPlayer(Player player);
}
