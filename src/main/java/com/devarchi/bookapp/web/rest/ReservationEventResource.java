package com.devarchi.bookapp.web.rest;

import com.devarchi.bookapp.domain.ReservationEvent;
import com.devarchi.bookapp.repository.ReservationEventRepository;
import com.devarchi.bookapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.devarchi.bookapp.domain.ReservationEvent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReservationEventResource {

    private final Logger log = LoggerFactory.getLogger(ReservationEventResource.class);

    private static final String ENTITY_NAME = "reservationEvent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReservationEventRepository reservationEventRepository;

    public ReservationEventResource(ReservationEventRepository reservationEventRepository) {
        this.reservationEventRepository = reservationEventRepository;
    }

    /**
     * {@code POST  /reservation-events} : Create a new reservationEvent.
     *
     * @param reservationEvent the reservationEvent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reservationEvent, or with status {@code 400 (Bad Request)} if the reservationEvent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reservation-events")
    public ResponseEntity<ReservationEvent> createReservationEvent(@Valid @RequestBody ReservationEvent reservationEvent) throws URISyntaxException {
        log.debug("REST request to save ReservationEvent : {}", reservationEvent);
        if (reservationEvent.getId() != null) {
            throw new BadRequestAlertException("A new reservationEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReservationEvent result = reservationEventRepository.save(reservationEvent);
        return ResponseEntity.created(new URI("/api/reservation-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reservation-events} : Updates an existing reservationEvent.
     *
     * @param reservationEvent the reservationEvent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reservationEvent,
     * or with status {@code 400 (Bad Request)} if the reservationEvent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reservationEvent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reservation-events")
    public ResponseEntity<ReservationEvent> updateReservationEvent(@Valid @RequestBody ReservationEvent reservationEvent) throws URISyntaxException {
        log.debug("REST request to update ReservationEvent : {}", reservationEvent);
        if (reservationEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReservationEvent result = reservationEventRepository.save(reservationEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reservationEvent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reservation-events} : get all the reservationEvents.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reservationEvents in body.
     */
    @GetMapping("/reservation-events")
    public List<ReservationEvent> getAllReservationEvents() {
        log.debug("REST request to get all ReservationEvents");
        return reservationEventRepository.findAll();
    }

    /**
     * {@code GET  /reservation-events/:id} : get the "id" reservationEvent.
     *
     * @param id the id of the reservationEvent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reservationEvent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reservation-events/{id}")
    public ResponseEntity<ReservationEvent> getReservationEvent(@PathVariable Long id) {
        log.debug("REST request to get ReservationEvent : {}", id);
        Optional<ReservationEvent> reservationEvent = reservationEventRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reservationEvent);
    }

    /**
     * {@code DELETE  /reservation-events/:id} : delete the "id" reservationEvent.
     *
     * @param id the id of the reservationEvent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reservation-events/{id}")
    public ResponseEntity<Void> deleteReservationEvent(@PathVariable Long id) {
        log.debug("REST request to delete ReservationEvent : {}", id);
        reservationEventRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
