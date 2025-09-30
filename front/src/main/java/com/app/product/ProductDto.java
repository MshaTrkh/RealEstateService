package com.app.product;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record ProductDto(
        Long id,

        @Size(min = 1, max = 255, message = "name is required length 1-255")
        @NotEmpty(message = "name is required")
        String name,
        @Size(min = 1, max = 255, message = "date is required length 1-255")
        String date,
        @Min(value = 1, message = "warranty is required min 1")
        @Max(value = 100, message = "warranty is required max 100")
        int warranty,
        @Size(min = 1, max = 255, message = "country is required length 1-255")
        @NotEmpty(message = "country is required")
        String country,
        @Size(min = 1, max = 255, message = "firm is required length 1-255")
        @NotEmpty(message = "firm is required")
        String firm,
        @Min(value = 0, message = "warranty is required min 0.01")
        @Max(value = 1000000, message = "warranty is required max 1000000")
        float price,
        @Size(min = 1, max = 5000, message = "description is required length 1-5000")
        @NotEmpty(message = "description is required")
        String description,

        String img,

        Long categoryId,
        String categoryName
) {
}
