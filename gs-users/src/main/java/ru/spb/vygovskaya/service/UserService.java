package ru.spb.vygovskaya.service;

import ru.spb.vygovskaya.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
}
