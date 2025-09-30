package com.app.ordering.convert;

import com.app.ordering.Ordering;
import com.app.ordering.OrderingDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class OrderingToOrderingDtoConverter implements Converter<Ordering, OrderingDto> {
    @Override
    public OrderingDto convert(Ordering source) {
        return new OrderingDto(
                source.getId(),

                source.getQuantity(),
                source.getContact(),
                source.getAddress(),

                source.getPrice(),
                source.getSum(),

                source.getStatus().name(),
                source.getStatus().getName(),

                source.getProduct().getId(),
                source.getProduct().getName(),
                source.getProduct().getImg(),

                source.getOwner().getId(),
                source.getOwner().getFio()
        );
    }
}
