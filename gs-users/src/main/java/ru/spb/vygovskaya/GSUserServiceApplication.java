package ru.spb.vygovskaya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import ru.spb.vygovskaya.config.AuthConfig;

@SpringBootApplication
@EnableConfigurationProperties(AuthConfig.class)
public class GSUserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GSUserServiceApplication.class, args);
    }

}
