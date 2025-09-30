package com.app.ordering;

import com.app.appUser.AppUser;
import com.app.enums.OrderingStatus;
import com.app.product.State;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

import static com.app.util.Global.round;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Ordering implements Serializable {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ordering_g")
    @SequenceGenerator(name = "ordering_g", sequenceName = "ordering_seq", allocationSize = 1)
    private Long id;

    private int quantity;
    private String contact;
    private String address;

    private float price;

    @Enumerated(EnumType.STRING)
    private OrderingStatus status = OrderingStatus.WAITING;

    @ManyToOne
    private State product;
    @ManyToOne
    private AppUser owner;

    public Ordering(int quantity, String contact, String address) {
        this.quantity = quantity;
        this.contact = contact;
        this.address = address;
    }

    public void setProduct(State product) {
        this.price = product.getPrice();
        this.product = product;
    }

    public float getSum() {
        return round(price * quantity);
    }

}