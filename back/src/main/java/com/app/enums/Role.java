package com.app.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
@Getter
public enum Role implements GrantedAuthority {
    MANAGER("Менеджер"),
    COLLECTOR("Юрист"),
    PACKER("Застройщик"),
    DELIVERY("Нотариус"),
    USER("Клиент"),
    ;

    private final String name;

    @Override
    public String getAuthority() {
        return name();
    }
}

