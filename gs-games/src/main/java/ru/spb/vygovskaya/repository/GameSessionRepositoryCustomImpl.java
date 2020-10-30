package ru.spb.vygovskaya.repository;

import org.springframework.beans.factory.annotation.Autowired;
import ru.spb.vygovskaya.dto.GameSessionMonthDto;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.lang.reflect.Array;
import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class GameSessionRepositoryCustomImpl implements GameSessionRepositoryCustom{

    private final EntityManager entityManager;

    @Autowired
    public GameSessionRepositoryCustomImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<GameSessionMonthDto> countGamesResultByMonth() {
        List<Object[]> resultList = entityManager.createNativeQuery("select EXTRACT(month FROM date) as month, game_id, count(*) as sessions_in_month" +
                " from game_sessions group by month, game_id order by month, game_id").getResultList();
        return resultList.stream().map(record -> {
            double month = (double) record[0];
            Long gameId = ((BigInteger) record[1]).longValue();
            Integer count = ((BigInteger) record[2]).intValue();
            return new GameSessionMonthDto((int) month, gameId, count);
        }).collect(Collectors.toList());
    }
}
