package ru.spb.vygovskaya.controller;

import com.fasterxml.jackson.core.JsonFactoryBuilder;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.spb.vygovskaya.domain.User;
import ru.spb.vygovskaya.service.UserService;

import java.util.Optional;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public String user(@AuthenticationPrincipal OAuth2User principal, Model model){
        Optional<User> user = userService.findByEmail(principal.getAttribute("email"));
        if (user.isPresent()) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", user.get().getId());
            jsonObject.put("key", user.get().getUuid());
            jsonObject.put("name", user.get().getName());
            model.addAttribute("payload", jsonObject.toString());
        }
        return "autorization";
    }
}
