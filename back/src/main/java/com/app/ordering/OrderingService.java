package com.app.ordering;

import com.app.appUser.AppUser;
import com.app.appUser.UserService;
import com.app.enums.OrderingStatus;
import com.app.product.ProductService;
import com.app.system.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderingService {

    private final OrderingRepository repository;
    private final UserService userService;
    private final ProductService productService;

    public List<Ordering> findAll() {
        List<Ordering> res;

        AppUser user = userService.getCurrentUser();

        switch (user.getRole()) {
            case MANAGER -> res = repository.findAll();
            case USER -> res = user.getOrderings();
            case COLLECTOR -> res = findAllByStatus(OrderingStatus.CONFIRMED);
            case PACKER -> res = findAllByStatus(OrderingStatus.COLLECTED);
            case DELIVERY -> res = findAllByStatus(OrderingStatus.PACKED);
            default -> res = new ArrayList<>();
        }

        res.sort(Comparator.comparing(Ordering::getId));
        Collections.reverse(res);

        return res;
    }

    public List<Ordering> findAllByStatus(OrderingStatus status) {
        return repository.findAllByStatus(status);
    }

    public Ordering find(String id) {
        return repository.findById(Long.parseLong(id)).orElseThrow(() -> new ObjectNotFoundException("Не найдена заявка по ИД: " + id));
    }

    public void save(Ordering save, String productId) {
        save.setProduct(productService.find(productId));
        save.setOwner(userService.getCurrentUser());
        repository.save(save);
    }

    public Ordering confirmed(String id) {
        Ordering ordering = find(id);
        ordering.setStatus(OrderingStatus.CONFIRMED);
        return repository.save(ordering);
    }

    public Ordering rejected(String id) {
        Ordering ordering = find(id);
        ordering.setStatus(OrderingStatus.REJECTED);
        return repository.save(ordering);
    }

    public void collected(String id) {
        Ordering ordering = find(id);
        ordering.setStatus(OrderingStatus.COLLECTED);
        repository.save(ordering);
    }

    public void packed(String id) {
        Ordering ordering = find(id);
        ordering.setStatus(OrderingStatus.PACKED);
        repository.save(ordering);
    }

    public void delivered(String id) {
        Ordering ordering = find(id);
        ordering.setStatus(OrderingStatus.DELIVERED);
        repository.save(ordering);
    }

    public void delete(String id) {
        Ordering delete = find(id);
        repository.deleteById(delete.getId());
    }

}
