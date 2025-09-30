package com.app.appUser;

import com.app.enums.Country;
import com.app.enums.Role;
import com.app.ordering.Ordering;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class AppUser implements Serializable {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "app_user_g")
    @SequenceGenerator(name = "app_user_g", sequenceName = "app_user_seq", allocationSize = 1)
    private Long id;

    @Size(min = 1, max = 255, message = "username is required length 1-255")
    @NotEmpty(message = "username is required")
    private String username;
    @Size(min = 1, max = 255, message = "password is required length 1-255")
    @NotEmpty(message = "password is required")
    private String password;

    @Size(min = 1, max = 255, message = "fio is required length 1-255")
    @NotEmpty(message = "fio is required")
    private String fio;

    private String address = "Адрес";
    private String unp = "УНП";

    @Enumerated(EnumType.STRING)
    private Country country = Country.BELARUS;

    @Column(length = 1000)
    private String img = "/img/avatar.jpg";

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Ordering> orderings = new ArrayList<>();

    public AppUser(String username, String fio, String address, String unp) {
        this.username = username;
        this.fio = fio;
        this.address = address;
        this.unp = unp;
    }

    public void update(AppUser update) {
        this.fio = update.getFio();
        this.address = update.getAddress();
        this.unp = update.getUnp();
    }

}