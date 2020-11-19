package ru.spb.vygovskaya.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Component;
import ru.spb.vygovskaya.domain.User;
import ru.spb.vygovskaya.service.UserService;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.UUID;

@Component
public class AuthenticationListener implements ApplicationListener<AuthenticationSuccessEvent> {

    private final UserService userService;

    @Autowired
    public AuthenticationListener(UserService userService) {
        this.userService = userService;
    }



    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        Object object = event.getAuthentication().getPrincipal();
        if (object instanceof DefaultOidcUser){
            DefaultOidcUser principal = (DefaultOidcUser) object;
            String name = principal.getFullName();
            String email = principal.getEmail();
            Optional<User> optionalUser = userService.findByEmail(email);
            User user = optionalUser.orElse(new User(name, email));
            user.setUuid(UUID.randomUUID());
            user.setAuthenticationTime(new Timestamp(System.currentTimeMillis()));
            userService.save(user);
        }
    }
}
