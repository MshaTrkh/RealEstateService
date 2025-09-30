package com.app.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OrderingStatus {
    WAITING("Рассмотрение"),
    CONFIRMED("Документы переданы в обработку"),
    COLLECTED("Подписаны юристом"),
    PACKED("Подписаны застройщиком"),
    DELIVERED("Документы готовы"),
    REJECTED("Отклонено"),
    ;

    private final String name;

}

