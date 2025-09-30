package com.app.category;

import com.app.product.State;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static com.app.util.Global.round;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Category implements Serializable {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "category_g")
    @SequenceGenerator(name = "category_g", sequenceName = "category_seq", allocationSize = 1)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<State> products = new ArrayList<>();

    public Category(String name) {
        this.name = name;
    }

    public void update(Category update) {
        this.name = update.getName();
    }

    public float getIncome() {
        return round(products.stream().reduce(0f, (i, product) -> i + product.getIncome(), Float::sum));
    }

}