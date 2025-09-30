package com.app.product;

import com.app.product.converter.ProductDtoToProductConverter;
import com.app.product.converter.ProductToProductDtoConverter;
import com.app.system.Result;
import com.app.system.StatusCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Collectors;

import static com.app.util.Global.MANAGER;
import static com.app.util.Global.USER;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;
    private final ProductToProductDtoConverter toDtoConverter;
    private final ProductDtoToProductConverter toConverter;

    @GetMapping
    @Secured({MANAGER, USER})
    public Result findAll() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find All",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @GetMapping("/{id}")
    @Secured({MANAGER, USER})
    public Result find(@PathVariable String id) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find",
                toDtoConverter.convert(service.find(id))
        );
    }

    @PostMapping
    @Secured({MANAGER})
    public Result save(@Valid @RequestBody ProductDto saveDto, @RequestParam String categoryId) {
        State save = toConverter.convert(saveDto);
        State saved = service.save(save, categoryId);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Save",
                toDtoConverter.convert(saved)
        );
    }

    @PutMapping("/{id}")
    @Secured({MANAGER})
    public Result update(@PathVariable String id, @Valid @RequestBody ProductDto updateDto, @RequestParam String categoryId) {
        State update = toConverter.convert(updateDto);
        State updated = service.update(id, update, categoryId);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update",
                toDtoConverter.convert(updated)
        );
    }

    @PatchMapping("/{id}/img")
    @Secured({MANAGER})
    public Result updateImg(@PathVariable String id, @RequestParam MultipartFile files) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Img",
                toDtoConverter.convert(service.updateImg(id, files))
        );
    }

    @DeleteMapping("/{id}")
    @Secured({MANAGER})
    public Result delete(@PathVariable String id) {
        service.delete(id);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delete"
        );
    }

}
