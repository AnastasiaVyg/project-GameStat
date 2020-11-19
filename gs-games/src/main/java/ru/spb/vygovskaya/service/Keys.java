package ru.spb.vygovskaya.service;

import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;
import com.netflix.hystrix.HystrixCommandKey;

public interface Keys {
    HystrixCommandGroupKey HYSTRIX_JDBC_GROUP_KEY =
            HystrixCommandGroupKey.Factory.asKey("jdbcGroup");

    HystrixCommandKey HYSTRIX_JDBC_COMMAND_KEY =
            HystrixCommandKey.Factory.asKey("jdbcCommand");

    HystrixCommand.Setter jdbcSetter = HystrixCommand.Setter.withGroupKey(HYSTRIX_JDBC_GROUP_KEY).andCommandKey(HYSTRIX_JDBC_COMMAND_KEY);
}
