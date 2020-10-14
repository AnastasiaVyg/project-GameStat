package ru.spb.vygovskaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spb.vygovskaya.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
