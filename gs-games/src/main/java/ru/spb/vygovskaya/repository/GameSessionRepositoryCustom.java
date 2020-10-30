package ru.spb.vygovskaya.repository;

import ru.spb.vygovskaya.dto.GameSessionMonthDto;

import java.util.List;

public interface GameSessionRepositoryCustom {
    List<GameSessionMonthDto> countGamesResultByMonth();
}
