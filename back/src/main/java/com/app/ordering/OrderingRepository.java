package com.app.ordering;

import com.app.enums.OrderingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderingRepository extends JpaRepository<Ordering, Long> {
    List<Ordering> findAllByStatus(OrderingStatus status);
}
