package com.app.stats;

import com.app.appUser.AppUser;
import com.app.appUser.UserService;
import com.app.category.Category;
import com.app.category.CategoryService;
import com.app.enums.Country;
import com.app.enums.OrderingStatus;
import com.app.enums.Role;
import com.app.ordering.OrderingService;
import com.app.product.State;
import com.app.product.ProductService;
import com.app.system.Result;
import com.app.system.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import static com.app.util.Global.MANAGER;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
@Secured({MANAGER})
public class SalesStatistic {

    private final CategoryService categoryService;
    private final OrderingService orderingService;
    private final ProductService productService;
    private final UserService userService;

    @GetMapping("/categories")
    public Result categories() {
        Map<String, List<?>> res = new HashMap<>();

        List<String> names = new ArrayList<>();
        List<Float> values = new ArrayList<>();

        List<Category> categories = categoryService.findAll();

        for (Category i : categories) {
            names.add(i.getName());
            values.add(i.getIncome());
        }

        res.put("names", names);
        res.put("values", values);

        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Categories",
                Collections.unmodifiableMap(res)
        );
    }

    @GetMapping("/orderingStatuses")
    public Result orderingStatuses() {
        Map<String, List<?>> res = new HashMap<>();

        List<String> names = new ArrayList<>();
        List<Integer> values = new ArrayList<>();

        List<OrderingStatus> orderingStatuses = List.of(OrderingStatus.values());

        for (OrderingStatus i : orderingStatuses) {
            names.add(i.getName());
            values.add(orderingService.findAllByStatus(i).size());
        }

        res.put("names", names);
        res.put("values", values);

        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Ordering Statuses",
                Collections.unmodifiableMap(res)
        );
    }

    @GetMapping("/top5Products")
    public Result top5Products() {
        Map<String, List<?>> res = new HashMap<>();

        List<String> names = new ArrayList<>();
        List<Float> values = new ArrayList<>();

        List<State> products = productService.findAll();

        products.sort(Comparator.comparing(State::getIncome));
        Collections.reverse(products);

        for (int i = 0; i < products.size(); i++) {
            if (i == 5) break;
            names.add(products.get(i).getName());
            values.add(products.get(i).getIncome());
        }

        res.put("names", names);
        res.put("values", values);

        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Top 5 Products",
                Collections.unmodifiableMap(res)
        );
    }

    @GetMapping("/countries")
    public Result countries() {
        Map<String, List<?>> res = new HashMap<>();

        List<String> names = new ArrayList<>();
        List<Integer> values = new ArrayList<>();

        List<AppUser> users = userService.findAllByRole(Role.USER);

        List<Country> countries = List.of(Country.values());

        for (Country i : countries) {
            names.add(i.getName());
            values.add(users.stream().reduce(0, (integer, user) -> {
                if (user.getCountry() == i) return integer + 1;
                return integer;
            }, Integer::sum));
        }

        res.put("names", names);
        res.put("values", values);

        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Countries",
                Collections.unmodifiableMap(res)
        );
    }

}
