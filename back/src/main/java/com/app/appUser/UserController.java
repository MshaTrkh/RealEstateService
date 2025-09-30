package com.app.appUser;

import com.app.appUser.converter.UserDtoToUserConverter;
import com.app.appUser.converter.UserToUserDtoConverter;
import com.app.system.Result;
import com.app.system.StatusCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Collectors;

import static com.app.util.Global.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;
    private final UserToUserDtoConverter toDtoConverter;
    private final UserDtoToUserConverter toUserConverter;

    @Secured({MANAGER})
    @GetMapping("/all")
    public Result findAll() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Find All Users Success",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @Secured({MANAGER, COLLECTOR, PACKER, DELIVERY, USER})
    @GetMapping
    public Result find() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Find User Success",
                toDtoConverter.convert(service.getCurrentUser())
        );
    }

    @Secured({MANAGER})
    @GetMapping("/{userId}")
    public Result findById(@PathVariable String userId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Find One User Success",
                toDtoConverter.convert(service.findById(userId))
        );
    }

    @PostMapping
    public Result addUser(@Valid @RequestBody AppUser newUser) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Add Success",
                toDtoConverter.convert(service.save(newUser))
        );
    }

    @Secured({MANAGER, COLLECTOR, PACKER, DELIVERY, USER})
    @PutMapping
    public Result update(@Valid @RequestBody UserDto updateDto) {
        AppUser update = toUserConverter.convert(updateDto);
        AppUser updated = service.update(update);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Update Success",
                toDtoConverter.convert(updated)
        );
    }

    @Secured({MANAGER, COLLECTOR, PACKER, DELIVERY, USER})
    @PatchMapping("/img")
    public Result updateImg(@RequestParam MultipartFile files) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Update Img Success",
                toDtoConverter.convert(service.updateImg(files))

        );
    }

    @Secured({MANAGER})
    @PatchMapping("/{userId}/role")
    public Result updateRole(@PathVariable String userId, @RequestParam String role) {
        AppUser updated = service.updateRole(userId, role);
        UserDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Update Role Success",
                updatedDto
        );
    }

    @Secured({USER})
    @PatchMapping("/country")
    public Result updateCountry(@RequestParam String country) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Update Country Success",
                toDtoConverter.convert(service.updateCountry(country))
        );
    }

    @Secured({MANAGER})
    @DeleteMapping("/{userId}")
    public Result delete(@PathVariable String userId) {
        service.deleteById(userId);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Delete Success"
        );
    }
}
