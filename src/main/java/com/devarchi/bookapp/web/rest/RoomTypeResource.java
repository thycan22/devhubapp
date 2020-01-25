package com.devarchi.bookapp.web.rest;

import com.devarchi.bookapp.domain.RoomType;
import com.devarchi.bookapp.repository.RoomTypeRepository;
import com.devarchi.bookapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.devarchi.bookapp.domain.RoomType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RoomTypeResource {

    private final Logger log = LoggerFactory.getLogger(RoomTypeResource.class);

    private static final String ENTITY_NAME = "roomType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeResource(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    /**
     * {@code POST  /room-types} : Create a new roomType.
     *
     * @param roomType the roomType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new roomType, or with status {@code 400 (Bad Request)} if the roomType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/room-types")
    public ResponseEntity<RoomType> createRoomType(@RequestBody RoomType roomType) throws URISyntaxException {
        log.debug("REST request to save RoomType : {}", roomType);
        if (roomType.getId() != null) {
            throw new BadRequestAlertException("A new roomType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoomType result = roomTypeRepository.save(roomType);
        return ResponseEntity.created(new URI("/api/room-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /room-types} : Updates an existing roomType.
     *
     * @param roomType the roomType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated roomType,
     * or with status {@code 400 (Bad Request)} if the roomType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the roomType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/room-types")
    public ResponseEntity<RoomType> updateRoomType(@RequestBody RoomType roomType) throws URISyntaxException {
        log.debug("REST request to update RoomType : {}", roomType);
        if (roomType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RoomType result = roomTypeRepository.save(roomType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, roomType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /room-types} : get all the roomTypes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of roomTypes in body.
     */
    @GetMapping("/room-types")
    public List<RoomType> getAllRoomTypes() {
        log.debug("REST request to get all RoomTypes");
        return roomTypeRepository.findAll();
    }

    /**
     * {@code GET  /room-types/:id} : get the "id" roomType.
     *
     * @param id the id of the roomType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the roomType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/room-types/{id}")
    public ResponseEntity<RoomType> getRoomType(@PathVariable Long id) {
        log.debug("REST request to get RoomType : {}", id);
        Optional<RoomType> roomType = roomTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(roomType);
    }

    /**
     * {@code DELETE  /room-types/:id} : delete the "id" roomType.
     *
     * @param id the id of the roomType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/room-types/{id}")
    public ResponseEntity<Void> deleteRoomType(@PathVariable Long id) {
        log.debug("REST request to delete RoomType : {}", id);
        roomTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
