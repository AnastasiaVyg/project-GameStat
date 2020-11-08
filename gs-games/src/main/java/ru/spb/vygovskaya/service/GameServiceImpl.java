package ru.spb.vygovskaya.service;


import com.netflix.hystrix.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.spb.vygovskaya.domain.Game;
import ru.spb.vygovskaya.repository.GameRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class GameServiceImpl implements GameService{

    private final GameRepository gameRepository;

    @Autowired
    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public List<Game> findAll() {
        HystrixCommand<List<Game>> cmd = new HystrixCommand(Keys.jdbcSetter) {
            @Override
            protected List<Game> run() throws Exception {
                return gameRepository.findAll();
            }

            @Override
            protected List<Game> getFallback() {
                return Collections.emptyList();
            }
        };
        return cmd.execute();
    }

    @Transactional
    @Override
    public Game save(String name) {
        Game game = new Game(name);
        return gameRepository.save(game);
    }

    @Override
    public Optional<Game> findById(Long id) {
        return gameRepository.findById(id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        gameRepository.deleteById(id);
    }

    @Transactional
    @Override
    public boolean update(Long id, String name) {
        Optional<Game> optionalGame = findById(id);
        if (optionalGame.isPresent()){
            Game game = optionalGame.get();
            game.setName(name);
            gameRepository.save(game);
            return true;
        } else {
            return false;
        }
    }
}
