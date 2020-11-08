package ru.spb.vygovskaya.feign;

public class GSUserFallback implements GSUserServiceProxy{

    @Override
    public String authentication(long id, String secret) {
        return "";
    }
}
