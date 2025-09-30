package com.app.product;

import com.app.category.Category;
import com.app.enums.OrderingStatus;
import com.app.ordering.Ordering;
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
public class State implements Serializable {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "product_g")
    @SequenceGenerator(name = "product_g", sequenceName = "product_seq", allocationSize = 1)
    private Long id;

    private String name;
    private String date;
    private int warranty;
    private String country;
    private String firm;
    private float price;

    @Column(length = 5000)
    private String description;

    @Column(length = 1000)
    private String img = "";

    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Ordering> orderings = new ArrayList<>();

    public State(String name, String date, int warranty, String country, String firm, float price, String description) {
        this.name = name;
        this.date = date;
        this.warranty = warranty;
        this.country = country;
        this.firm = firm;
        this.price = price;
        this.description = description;
    }

    public void update(State update) {
        this.name = update.getName();
        this.date = update.getDate();
        this.warranty = update.getWarranty();
        this.country = update.getCountry();
        this.firm = update.getFirm();
        this.price = update.getPrice();
        this.description = update.getDescription();
    }

    public float getIncome() {
        return round(orderings.stream().reduce(0f, (i, ordering) -> {
            if (ordering.getStatus() == OrderingStatus.DELIVERED) return i + ordering.getSum();
            return i;
        }, Float::sum));
    }

}