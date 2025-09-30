package com.app.product.converter;

import com.app.product.State;
import com.app.product.ProductDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ProductDtoToProductConverter implements Converter<ProductDto, State> {
    @Override
    public State convert(ProductDto source) {
        return new State(
                source.name(),
                source.date(),
                source.warranty(),
                source.country(),
                source.firm(),
                source.price(),
                source.description()
        );
    }
}
