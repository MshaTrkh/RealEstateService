package com.app.appUser;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record UserDto(
        Long id,

        String username,
        String role,

        @Size(min = 1, max = 255, message = "fio is required length 1-255")
        @NotEmpty(message = "fio is required")
        String fio,
        @Size(min = 1, max = 255, message = "address is required length 1-255")
        @NotEmpty(message = "address is required")
        String address,
        @Size(min = 1, max = 255, message = "unp is required length 1-255")
        @NotEmpty(message = "unp is required")
        String unp,

        String country,
        String countryName,

        String img
) {
}
