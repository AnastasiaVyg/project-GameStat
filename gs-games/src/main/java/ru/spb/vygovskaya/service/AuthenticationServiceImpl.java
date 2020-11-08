package ru.spb.vygovskaya.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spb.vygovskaya.config.AuthConfig;
import ru.spb.vygovskaya.feign.GSUserServiceProxy;

@Service
public class AuthenticationServiceImpl implements AuthenticationService{

    private final AuthConfig authConfig;

    private final GSUserServiceProxy gsUserServiceProxy;

    @Autowired
    public AuthenticationServiceImpl(AuthConfig authConfig, GSUserServiceProxy gsUserServiceProxy) {
        this.authConfig = authConfig;
        this.gsUserServiceProxy = gsUserServiceProxy;
    }

    @Override
    public String getUserGuid(String id) {
        return gsUserServiceProxy.authentication(Long.valueOf(id).longValue(), authConfig.getKey());
    }
}
