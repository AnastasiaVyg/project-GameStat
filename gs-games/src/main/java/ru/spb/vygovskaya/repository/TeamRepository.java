package ru.spb.vygovskaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spb.vygovskaya.domain.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
