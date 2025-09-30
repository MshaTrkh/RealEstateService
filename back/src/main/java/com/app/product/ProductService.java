package com.app.product;

import com.app.category.CategoryService;
import com.app.system.exception.BadRequestException;
import com.app.system.exception.ObjectNotFoundException;
import com.app.util.Global;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;
    private final CategoryService categoryService;

    public List<State> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public State find(String id) {
        return repository.findById(Long.parseLong(id)).orElseThrow(() -> new ObjectNotFoundException("Не найден продукт по ИД: " + id));
    }

    public State save(State save, String categoryId) {
        save.setCategory(categoryService.find(categoryId));
        return repository.save(save);
    }

    public State update(String id, State update, String categoryId) {
        State old = find(id);
        old.update(update);
        old.setCategory(categoryService.find(categoryId));
        return repository.save(old);
    }

    public State updateImg(String id, MultipartFile img) {
        State product = find(id);

        try {
            product.setImg(Global.saveFile(img, "product"));
        } catch (IOException e) {
            throw new BadRequestException("Некорректное изображение");
        }

        return repository.save(product);
    }

    public void delete(String id) {
        State delete = find(id);
        repository.deleteById(delete.getId());
    }

}
