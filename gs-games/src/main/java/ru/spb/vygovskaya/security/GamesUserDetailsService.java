package ru.spb.vygovskaya.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.spb.vygovskaya.service.AuthenticationService;

import java.util.Collections;
import java.util.List;

@Component
public class GamesUserDetailsService implements UserDetailsService {

    private final AuthenticationService authenticationService;

    public GamesUserDetailsService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        String userGuid = authenticationService.getUserGuid(userId);

        if (userGuid == null || userGuid.equals("")){
            throw new UsernameNotFoundException("user not found");
        }

        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("user"));
        return new org.springframework.security.core.userdetails.User(userId, userGuid, authorities);
    }
}
