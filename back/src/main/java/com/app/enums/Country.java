package com.app.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
@Getter
public enum Country {
    BELARUS("Беларусь"),
    RUSSIA("Россия"),
    ;

    private final String name;

}

