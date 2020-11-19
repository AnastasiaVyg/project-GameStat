package ru.spb.vygovskaya.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(name = "gs-users", fallback = GSUserFallback.class)
@RequestMapping(value = "/userserver")
public interface GSUserServiceProxy {

    @PostMapping("/authentication/{id}")
    public String authentication(@PathVariable long id, @RequestBody String secret);
}
