package ru.spb.vygovskaya.service;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ru.spb.vygovskaya.config.AuthConfig;
import ru.spb.vygovskaya.feign.GSUserServiceProxy;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationServiceImpl implements AuthenticationService{

//    private static final String URL = "http://localhost:7101/userserver/authentication/{id}";
    private final AuthConfig authConfig;

    private final GSUserServiceProxy gsUserServiceProxy;

    @Autowired
    public AuthenticationServiceImpl(AuthConfig authConfig, GSUserServiceProxy gsUserServiceProxy) {
        this.authConfig = authConfig;
        this.gsUserServiceProxy = gsUserServiceProxy;
    }

    @Override
    public String getUserGuid(String id) {
//        RestTemplate restTemplate = new RestTemplate();
//        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
//
//        HttpHeaders requestHeaders = new HttpHeaders();
//        requestHeaders.setContentType(MediaType.valueOf("text/plain"));
//
//        HttpEntity<String> requestEntity = new HttpEntity<>(authConfig.getKey(), requestHeaders);
//        Map<String, String> variables = new HashMap<>();
//        variables.put("id", id);
//        ResponseEntity<String> responseEntity = restTemplate.exchange(URL, HttpMethod.POST, requestEntity, String.class, variables);

//        if(responseEntity.getStatusCode() == HttpStatus.OK){
//            return responseEntity.getBody();
//        }

        return gsUserServiceProxy.authentication(Long.valueOf(id).longValue(), authConfig.getKey());
    }
}
