package ru.spb.vygovskaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spb.vygovskaya.domain.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
