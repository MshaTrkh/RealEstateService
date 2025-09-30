package com.app.ordering;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record OrderingDto(
        Long id,

        @Min(value = 1, message = "quantity is required min 1")
        @Max(value = 100, message = "quantity is required min 100")
        int quantity,
        @Size(min = 1, max = 255, message = "contact is required length 1-255")
        @NotEmpty(message = "contact is required")
        String contact,
        @Size(min = 1, max = 255, message = "address is required length 1-255")
        @NotEmpty(message = "address is required")
        String address,

        float price,
        float sum,

        String status,
        String statusName,

        Long productId,
        String productName,
        String productImg,

        Long ownerId,
        String ownerFio
) {
}
