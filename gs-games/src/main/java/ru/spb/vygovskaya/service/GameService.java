package ru.spb.vygovskaya.service;

import ru.spb.vygovskaya.domain.Game;

import java.util.List;
import java.util.Optional;

public interface GameService {
    List<Game> findAll();
    Game save(String name);
    Optional<Game> findById(Long id);
    void deleteById(Long id);
    boolean update(Long id, String name);
}
