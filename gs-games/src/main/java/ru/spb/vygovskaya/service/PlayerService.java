package ru.spb.vygovskaya.service;

import ru.spb.vygovskaya.domain.Player;
import ru.spb.vygovskaya.dto.PlayerDto;

import java.util.List;
import java.util.Optional;

public interface PlayerService {
    List<PlayerDto> findAll();
    PlayerDto save(PlayerDto playerDto);
    Optional<Player> findById(Long id);
    void deleteById(Long id);
    boolean update(PlayerDto playerDto);
}
