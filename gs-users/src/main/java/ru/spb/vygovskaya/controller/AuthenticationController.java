package ru.spb.vygovskaya.controller;

import org.springframework.web.bind.annotation.*;
import ru.spb.vygovskaya.config.AuthConfig;
import ru.spb.vygovskaya.domain.User;
import ru.spb.vygovskaya.service.UserService;

import java.sql.Timestamp;
import java.util.Optional;

@RestController
public class AuthenticationController {

    private static final int PASSWORD_LIFE_TIME = 5000;
    private final UserService userService;
    private final AuthConfig authConfig;

    public AuthenticationController(UserService userService, AuthConfig authConfig) {
        this.userService = userService;
        this.authConfig = authConfig;
    }

    @PostMapping("/authentication/{id}")
    public String authentication(@PathVariable long id, @RequestBody String secret){
        if (!authConfig.getKey().equals(secret)){
            return "";
        }
        Optional<User> optionalUser = userService.findById(id);

        if (optionalUser.isPresent()){
            Timestamp timeNow = new Timestamp(System.currentTimeMillis());
            Timestamp authenticationTime = optionalUser.get().getAuthenticationTime();
            long l = timeNow.getTime() - authenticationTime.getTime();
            if (l > PASSWORD_LIFE_TIME){
                return "";
            }

            return optionalUser.get().getUuid().toString();
        }
        return "";
    }
}
