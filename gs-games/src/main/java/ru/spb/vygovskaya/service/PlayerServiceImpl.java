package ru.spb.vygovskaya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spb.vygovskaya.domain.Player;
import ru.spb.vygovskaya.domain.User;
import ru.spb.vygovskaya.dto.PlayerDto;
import ru.spb.vygovskaya.repository.PlayerRepository;
import ru.spb.vygovskaya.repository.TeamRepository;
import ru.spb.vygovskaya.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService{

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    @Autowired
    public PlayerServiceImpl(PlayerRepository playerRepository, TeamRepository teamRepository, UserRepository userRepository) {
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<PlayerDto> findAll() {
        List<Player> players = playerRepository.findAll();
        List<PlayerDto> result = new ArrayList<>();
        players.stream().forEach(player -> result.add(new PlayerDto(player)));
        return result;
    }

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

    @Override
    public void deleteById(Long id) {
        playerRepository.deleteById(id);
    }

    @Override
    public boolean update(PlayerDto playerDto) {
        return false;
    }
}
