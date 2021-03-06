package ru.spb.vygovskaya.service;

import com.netflix.hystrix.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.spb.vygovskaya.domain.Player;
import ru.spb.vygovskaya.domain.User;
import ru.spb.vygovskaya.dto.PlayerDto;
import ru.spb.vygovskaya.repository.PlayerRepository;
import ru.spb.vygovskaya.repository.UserRepository;

import java.util.*;

@Service
public class PlayerServiceImpl implements PlayerService{

    private final PlayerRepository playerRepository;
    private final UserRepository userRepository;

    @Autowired
    public PlayerServiceImpl(PlayerRepository playerRepository, UserRepository userRepository) {
        this.playerRepository = playerRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<PlayerDto> findAll() {
        com.netflix.hystrix.HystrixCommand<List<PlayerDto>> cmd = new HystrixCommand<>(Keys.jdbcSetter) {
            private String guid = UUID.randomUUID().toString();
            @Override
            protected List<PlayerDto> run() throws Exception {
                List<Player> players = playerRepository.findAll();
                List<PlayerDto> result = new ArrayList<>();
                players.forEach(player -> result.add(new PlayerDto(player)));
                return result;
            }

            @Override
            protected List<PlayerDto> getFallback() {
                return Collections.emptyList();
            }
        };
        return cmd.execute();
    }

    @Transactional
    @Override
    public PlayerDto save(PlayerDto playerDto) {
        Player player = new Player(playerDto.getName());
        if (playerDto.getUser() != null){
            Optional<User> userOptional = userRepository.findById(playerDto.getUser().getId());
            userOptional.ifPresent(user -> player.setUser(user));
        }
        Player savePlayer = playerRepository.save(player);
        return new PlayerDto(savePlayer);
    }

    @Override
    public Optional<Player> findById(Long id) {
        return playerRepository.findById(id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        playerRepository.deleteById(id);
    }

    @Transactional
    @Override
    public boolean updateName(Long id, String name) {
        Optional<Player> optionalPlayer = findById(id);
        if (optionalPlayer.isPresent()){
            Player player = optionalPlayer.get();
            player.setName(name);
            playerRepository.save(player);
            return true;
        } else {
            return false;
        }
    }
}
