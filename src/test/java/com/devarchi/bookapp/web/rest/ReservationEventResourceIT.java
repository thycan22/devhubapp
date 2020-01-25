package com.devarchi.bookapp.web.rest;

import com.devarchi.bookapp.DevApp;
import com.devarchi.bookapp.domain.ReservationEvent;
import com.devarchi.bookapp.repository.ReservationEventRepository;
import com.devarchi.bookapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.devarchi.bookapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReservationEventResource} REST controller.
 */
@SpringBootTest(classes = DevApp.class)
public class ReservationEventResourceIT {

    private static final LocalDate DEFAULT_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final Integer DEFAULT_NB_DAY = 1;
    private static final Integer UPDATED_NB_DAY = 2;

    private static final Integer DEFAULT_NB_ADULT = 1;
    private static final Integer UPDATED_NB_ADULT = 2;

    private static final Integer DEFAULT_NB_CHILD = 1;
    private static final Integer UPDATED_NB_CHILD = 2;

    @Autowired
    private ReservationEventRepository reservationEventRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restReservationEventMockMvc;

    private ReservationEvent reservationEvent;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReservationEventResource reservationEventResource = new ReservationEventResource(reservationEventRepository);
        this.restReservationEventMockMvc = MockMvcBuilders.standaloneSetup(reservationEventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReservationEvent createEntity(EntityManager em) {
        ReservationEvent reservationEvent = new ReservationEvent()
            .start(DEFAULT_START)
            .end(DEFAULT_END)
            .text(DEFAULT_TEXT)
            .nbDay(DEFAULT_NB_DAY)
            .nbAdult(DEFAULT_NB_ADULT)
            .nbChild(DEFAULT_NB_CHILD);
        return reservationEvent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReservationEvent createUpdatedEntity(EntityManager em) {
        ReservationEvent reservationEvent = new ReservationEvent()
            .start(UPDATED_START)
            .end(UPDATED_END)
            .text(UPDATED_TEXT)
            .nbDay(UPDATED_NB_DAY)
            .nbAdult(UPDATED_NB_ADULT)
            .nbChild(UPDATED_NB_CHILD);
        return reservationEvent;
    }

    @BeforeEach
    public void initTest() {
        reservationEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createReservationEvent() throws Exception {
        int databaseSizeBeforeCreate = reservationEventRepository.findAll().size();

        // Create the ReservationEvent
        restReservationEventMockMvc.perform(post("/api/reservation-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservationEvent)))
            .andExpect(status().isCreated());

        // Validate the ReservationEvent in the database
        List<ReservationEvent> reservationEventList = reservationEventRepository.findAll();
        assertThat(reservationEventList).hasSize(databaseSizeBeforeCreate + 1);
        ReservationEvent testReservationEvent = reservationEventList.get(reservationEventList.size() - 1);
        assertThat(testReservationEvent.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testReservationEvent.getEnd()).isEqualTo(DEFAULT_END);
        assertThat(testReservationEvent.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testReservationEvent.getNbDay()).isEqualTo(DEFAULT_NB_DAY);
        assertThat(testReservationEvent.getNbAdult()).isEqualTo(DEFAULT_NB_ADULT);
        assertThat(testReservationEvent.getNbChild()).isEqualTo(DEFAULT_NB_CHILD);
    }

    @Test
    @Transactional
    public void createReservationEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reservationEventRepository.findAll().size();

        // Create the ReservationEvent with an existing ID
        reservationEvent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReservationEventMockMvc.perform(post("/api/reservation-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservationEvent)))
            .andExpect(status().isBadRequest());

        // Validate the ReservationEvent in the database
        List<ReservationEvent> reservationEventList = reservationEventRepository.findAll();
        assertThat(reservationEventList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStartIsRequired() throws Exception {
        int databaseSizeBeforeTest = reservationEventRepository.findAll().size();
        // set the field null
        reservationEvent.setStart(null);

        // Create the ReservationEvent, which fails.

        restReservationEventMockMvc.perform(post("/api/reservation-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservationEvent)))
            .andExpect(status().isBadRequest());

        List<ReservationEvent> reservationEventList = reservationEventRepository.findAll();
        assertThat(reservationEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndIsRequired() throws Exception {
        int databaseSizeBeforeTest = reservationEventRepository.findAll().size();
        // set the field null
        reservationEvent.setEnd(null);

        // Create the ReservationEvent, which fails.

        restReservationEventMockMvc.perform(post("/api/reservation-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservationEvent)))
            .andExpect(status().isBadRequest());

        List<ReservationEvent> reservationEventList = reservationEventRepository.findAll();
        assertThat(reservationEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNbAdultIsRequired() throws Exception {
        int databaseSizeBeforeTest = reservationEventRepository.findAll().size();
        // set the field null
        reservationEvent.setNbAdult(null);

        // Create the ReservationEvent, which fails.

        restReservationEventMockMvc.perform(post("/api/reservation-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservationEvent)))
            .andExpect(status().isBadRequest());

        List<ReservationEvent> reservationEventList = reservationEventRepository.findAll();
        assertThat(reservationEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReservationEvents() throws Exception {
        // Initialize the database
        reservationEventRepository.saveAndFlush(reservationEvent);

        // Get all the reservationEventList
        restReservationEventMockMvc.perform(get("/api/reservation-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reservationEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)))
            .andExpect(jsonPath("$.[*].nbDay").value(hasItem(DEFAULT_NB_DAY)))
            .andExpect(jsonPath("$.[*].nbAdult").value(hasItem(DEFAULT_NB_ADULT)))
            .andExpect(jsonPath("$.[*].nbChild").value(hasItem(DEFAULT_NB_CHILD)));
    }
    
    @Test
    @Transactional
    public void getReservationEvent() throws Exception {
        // Initialize the database
        reservationEventRepository.saveAndFlush(reservationEvent);

        // Get the reservationEvent
        restReservationEventMockMvc.perform(get("/api/reservation-events/{id}", reservationEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reservationEvent.getId().intValue()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT))
            .andExpect(jsonPath("$.nbDay").value(DEFAULT_NB_DAY))
            .andExpect(jsonPath("$.nbAdult").value(DEFAULT_NB_ADULT))
            .andExpect(jsonPath("$.nbChild").value(DEFAULT_NB_CHILD));
    }

    @Test
    @Transactional
    public void getNonExistingReservationEvent() throws Exception {
        // Get the reservationEvent
        restReservationEventMockMvc.perform(get("/api/reservation-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReservationEvent() throws Exception {
        // Initialize the database
        reservationEventRepository.saveAndFlush(reservationEvent);

        int databaseSizeBeforeUpdate = reservationEventRepository.findAll().size();

        // Update the reservationEvent
        ReservationEvent updatedReservationEvent = reservationEventRepository.findById(reservationEvent.getId()).get();
        // Disconnect from session so that the updates on updatedReservationEvent are not directly saved in db
        em.detach(updatedReservationEvent);
        updatedReservationEvent
            .start(UPDATED_START)
            .end(UPDATED_END)
            .text(UPDATED_TEXT)
            .nbDay(UPDATED_NB_DAY)
            .nbAdult(UPDATED_NB_ADULT)
            .nbChild(UPDATED_NB_CHILD);

        restReservationEventMockMvc.perform(put("/api/reservation-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReservationEvent)))
            .andExpect(status().isOk());

        // Validate the ReservationEvent in the database
        List<ReservationEvent> reservationEventList = reservationEventRepository.findAll();
        assertThat(reservationEventList).hasSize(databaseSizeBeforeUpdate);
        ReservationEvent testReservationEvent = reservationEventList.get(reservationEventList.size() - 1);
        assertThat(testReservationEvent.getStart()).isEqualTo(UPDATED_START);
        assertThat(testReservationEvent.getEnd()).isEqualTo(UPDATED_END);
        assertThat(testReservationEvent.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testReservationEvent.getNbDay()).isEqualTo(UPDATED_NB_DAY);
        assertThat(testReservationEvent.getNbAdult()).isEqualTo(UPDATED_NB_ADULT);
        assertThat(testReservationEvent.getNbChild()).isEqualTo(UPDATED_NB_CHILD);
    }

    @Test
    @Transactional
    public void updateNonExistingReservationEvent() throws Exception {
        int databaseSizeBeforeUpdate = reservationEventRepository.findAll().size();

        // Create the ReservationEvent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReservationEventMockMvc.perform(put("/api/reservation-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservationEvent)))
            .andExpect(status().isBadRequest());

        // Validate the ReservationEvent in the database
        List<ReservationEvent> reservationEventList = reservationEventRepository.findAll();
        assertThat(reservationEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReservationEvent() throws Exception {
        // Initialize the database
        reservationEventRepository.saveAndFlush(reservationEvent);

        int databaseSizeBeforeDelete = reservationEventRepository.findAll().size();

        // Delete the reservationEvent
        restReservationEventMockMvc.perform(delete("/api/reservation-events/{id}", reservationEvent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReservationEvent> reservationEventList = reservationEventRepository.findAll();
        assertThat(reservationEventList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
