package ru.spb.vygovskaya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import ru.spb.vygovskaya.config.AuthConfig;

@SpringBootApplication
@EnableConfigurationProperties(AuthConfig.class)
@EnableEurekaClient
@EnableFeignClients(basePackages = "ru.spb.vygovskaya.feign")
public class GSGameServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GSGameServiceApplication.class, args);
    }

    @LoadBalanced
    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
