package com.app.appUser;

import com.app.enums.Country;
import com.app.enums.Role;
import com.app.system.exception.BadRequestException;
import com.app.system.exception.ObjectNotFoundException;
import com.app.util.Global;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username)
                .map(MyUserPrincipal::new)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь с логином " + username + " не найден"));
    }

    public AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            return repository.findByUsername(currentUserName).orElseThrow(() -> new ObjectNotFoundException("Пользователь не найден"));
        }
        return null;
    }

    public List<AppUser> findAll() {
        return repository.findAll();
    }

    public List<AppUser> findAllByRole(Role role) {
        return repository.findAllByRole(role);
    }

    public AppUser findById(String id) {
        try {
            Long longId = Long.parseLong(id);
            return repository.findById(longId).orElseThrow();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Не найден пользователь с ИД: " + id);
        }
    }

    public AppUser save(AppUser user) {
        if (repository.findByUsername(user.getUsername()).isPresent()) {
            throw new BadRequestException("Пользователь с таким логином уже существует");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (findAll().isEmpty()) {
            user.setRole(Role.MANAGER);
        }
        return repository.save(user);
    }

    public AppUser update(AppUser update) {
        AppUser old = getCurrentUser();
        System.out.println(update.getAddress());
        System.out.println(update.getUnp());
        System.out.println(old.getAddress());
        System.out.println(old.getUnp());
        old.update(update);
        return repository.save(old);
    }

    public AppUser updateImg(MultipartFile img) {
        AppUser user = getCurrentUser();
        try {
            user.setImg(Global.saveFile(img, "user"));
        } catch (IOException e) {
            throw new BadRequestException("Некорректное изображение");
        }
        return repository.save(user);
    }

    public AppUser updateRole(String id, String role) {
        AppUser user = findById(id);
        try {
            user.setRole(Role.valueOf(role));
        } catch (Exception e) {
            throw new BadRequestException("Некорректный выбор роли");
        }
        return repository.save(user);
    }

    public void deleteById(String userId) {
        AppUser user = findById(userId);
        repository.deleteById(user.getId());
    }

    public AppUser updateCountry(String country) {
        AppUser user = getCurrentUser();
        try {
            user.setCountry(Country.valueOf(country));
        } catch (Exception e) {
            throw new BadRequestException("Некорректный выбор страны");
        }
        return repository.save(user);
    }
}
