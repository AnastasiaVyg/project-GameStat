package ru.spb.vygovskaya.service;

import ru.spb.vygovskaya.dto.GameSessionDto;

import java.util.List;

public interface GameSessionService {

    List<GameSessionDto> findAll();
}
