package ru.spb.vygovskaya.service;

import ru.spb.vygovskaya.dto.GameSessionDto;
import ru.spb.vygovskaya.dto.GameSessionMonthDto;

import java.util.List;

public interface GameSessionService {

    List<GameSessionDto> findAll();
    GameSessionDto save(GameSessionDto gameSessionDto);
    void deleteById(Long id);
}
