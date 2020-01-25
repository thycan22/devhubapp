package com.devarchi.bookapp.repository;

import com.devarchi.bookapp.domain.RoomType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RoomType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {

}
