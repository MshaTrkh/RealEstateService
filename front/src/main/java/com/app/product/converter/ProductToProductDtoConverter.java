package com.app.product.converter;

import com.app.product.State;
import com.app.product.ProductDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProductToProductDtoConverter implements Converter<State, ProductDto> {
    @Override
    public ProductDto convert(State source) {
        return new ProductDto(
                source.getId(),

                source.getName(),
                source.getDate(),
                source.getWarranty(),
                source.getCountry(),
                source.getFirm(),
                source.getPrice(),
                source.getDescription(),

                source.getImg(),

                source.getCategory().getId(),
                source.getCategory().getName()
        );
    }
}
