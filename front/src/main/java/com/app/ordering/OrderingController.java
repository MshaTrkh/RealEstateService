package com.app.ordering;

import com.app.ordering.convert.OrderingDtoToOrderingConverter;
import com.app.ordering.convert.OrderingToOrderingDtoConverter;
import com.app.system.Result;
import com.app.system.StatusCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

import static com.app.util.Global.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orderings")
public class OrderingController {

    private final OrderingService service;
    private final OrderingToOrderingDtoConverter toDtoConverter;
    private final OrderingDtoToOrderingConverter toConverter;

    @GetMapping
    @Secured({MANAGER, USER, COLLECTOR, PACKER, DELIVERY})
    public Result findAll() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find All",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @PostMapping
    @Secured({USER})
    public Result save(@Valid @RequestBody OrderingDto saveDto, @RequestParam String productId) {
        service.save(toConverter.convert(saveDto), productId);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Save"
        );
    }

    @GetMapping("/{id}/confirmed")
    @Secured({MANAGER})
    public Result confirmed(@PathVariable String id) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Confirmed",
                toDtoConverter.convert(service.confirmed(id))
        );
    }

    @GetMapping("/{id}/rejected")
    @Secured({MANAGER})
    public Result rejected(@PathVariable String id) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Rejected",
                toDtoConverter.convert(service.rejected(id))
        );
    }

    @GetMapping("/{id}/collected")
    @Secured({COLLECTOR})
    public Result collected(@PathVariable String id) {
        service.collected(id);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Collected"
        );
    }

    @GetMapping("/{id}/packed")
    @Secured({PACKER})
    public Result packed(@PathVariable String id) {
        service.packed(id);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Packed"
        );
    }

    @GetMapping("/{id}/delivered")
    @Secured({DELIVERY})
    public Result delivered(@PathVariable String id) {
        service.delivered(id);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delivered"
        );
    }

    @DeleteMapping("/{id}")
    @Secured({USER})
    public Result delete(@PathVariable String id) {
        service.delete(id);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delete"
        );
    }

}
