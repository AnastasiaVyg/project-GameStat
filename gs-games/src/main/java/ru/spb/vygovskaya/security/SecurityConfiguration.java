package ru.spb.vygovskaya.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private RestAuthEntryPoint restAuthEntryPoint;
    private UserDetailsService userDetailsService;

    @Autowired
    public SecurityConfiguration(RestAuthEntryPoint restAuthEntryPoint, GamesUserDetailsService userDetailsService) {
        this.restAuthEntryPoint = restAuthEntryPoint;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new UserPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/games/**", "/players/**", "/teams/**", "/results/**", "/statistics/**")
                .hasAnyAuthority("user")
                .and()
                .formLogin().loginProcessingUrl("/login")
                .successHandler(new RefererRedirectionAuthenticationSuccessHandler())
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(restAuthEntryPoint);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }
}
