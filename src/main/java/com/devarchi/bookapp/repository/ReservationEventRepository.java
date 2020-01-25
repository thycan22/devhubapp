package com.devarchi.bookapp.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.devarchi.bookapp.domain.ReservationEvent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

/**
 * Spring Data repository for the ReservationEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReservationEventRepository extends JpaRepository<ReservationEvent, Long> {
    @Query("from ReservationEvent e where not(e.end < :from and e.start > :to)")
    public List<ReservationEvent> findBetween(@Param("from") LocalDateTime start,
            @Param("to") @DateTimeFormat(iso = ISO.DATE_TIME) LocalDateTime end);
}
