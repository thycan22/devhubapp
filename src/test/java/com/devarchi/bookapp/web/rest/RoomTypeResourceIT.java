package com.devarchi.bookapp.web.rest;

import com.devarchi.bookapp.DevApp;
import com.devarchi.bookapp.domain.RoomType;
import com.devarchi.bookapp.repository.RoomTypeRepository;
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
import java.util.List;

import static com.devarchi.bookapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RoomTypeResource} REST controller.
 */
@SpringBootTest(classes = DevApp.class)
public class RoomTypeResourceIT {

    private static final String DEFAULT_TYPE_BED = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_BED = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BATHROOM = false;
    private static final Boolean UPDATED_BATHROOM = true;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

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

    private MockMvc restRoomTypeMockMvc;

    private RoomType roomType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoomTypeResource roomTypeResource = new RoomTypeResource(roomTypeRepository);
        this.restRoomTypeMockMvc = MockMvcBuilders.standaloneSetup(roomTypeResource)
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
    public static RoomType createEntity(EntityManager em) {
        RoomType roomType = new RoomType()
            .typeBed(DEFAULT_TYPE_BED)
            .bathroom(DEFAULT_BATHROOM);
        return roomType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RoomType createUpdatedEntity(EntityManager em) {
        RoomType roomType = new RoomType()
            .typeBed(UPDATED_TYPE_BED)
            .bathroom(UPDATED_BATHROOM);
        return roomType;
    }

    @BeforeEach
    public void initTest() {
        roomType = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoomType() throws Exception {
        int databaseSizeBeforeCreate = roomTypeRepository.findAll().size();

        // Create the RoomType
        restRoomTypeMockMvc.perform(post("/api/room-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomType)))
            .andExpect(status().isCreated());

        // Validate the RoomType in the database
        List<RoomType> roomTypeList = roomTypeRepository.findAll();
        assertThat(roomTypeList).hasSize(databaseSizeBeforeCreate + 1);
        RoomType testRoomType = roomTypeList.get(roomTypeList.size() - 1);
        assertThat(testRoomType.getTypeBed()).isEqualTo(DEFAULT_TYPE_BED);
        assertThat(testRoomType.isBathroom()).isEqualTo(DEFAULT_BATHROOM);
    }

    @Test
    @Transactional
    public void createRoomTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roomTypeRepository.findAll().size();

        // Create the RoomType with an existing ID
        roomType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoomTypeMockMvc.perform(post("/api/room-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomType)))
            .andExpect(status().isBadRequest());

        // Validate the RoomType in the database
        List<RoomType> roomTypeList = roomTypeRepository.findAll();
        assertThat(roomTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRoomTypes() throws Exception {
        // Initialize the database
        roomTypeRepository.saveAndFlush(roomType);

        // Get all the roomTypeList
        restRoomTypeMockMvc.perform(get("/api/room-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roomType.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeBed").value(hasItem(DEFAULT_TYPE_BED)))
            .andExpect(jsonPath("$.[*].bathroom").value(hasItem(DEFAULT_BATHROOM.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getRoomType() throws Exception {
        // Initialize the database
        roomTypeRepository.saveAndFlush(roomType);

        // Get the roomType
        restRoomTypeMockMvc.perform(get("/api/room-types/{id}", roomType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(roomType.getId().intValue()))
            .andExpect(jsonPath("$.typeBed").value(DEFAULT_TYPE_BED))
            .andExpect(jsonPath("$.bathroom").value(DEFAULT_BATHROOM.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRoomType() throws Exception {
        // Get the roomType
        restRoomTypeMockMvc.perform(get("/api/room-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoomType() throws Exception {
        // Initialize the database
        roomTypeRepository.saveAndFlush(roomType);

        int databaseSizeBeforeUpdate = roomTypeRepository.findAll().size();

        // Update the roomType
        RoomType updatedRoomType = roomTypeRepository.findById(roomType.getId()).get();
        // Disconnect from session so that the updates on updatedRoomType are not directly saved in db
        em.detach(updatedRoomType);
        updatedRoomType
            .typeBed(UPDATED_TYPE_BED)
            .bathroom(UPDATED_BATHROOM);

        restRoomTypeMockMvc.perform(put("/api/room-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRoomType)))
            .andExpect(status().isOk());

        // Validate the RoomType in the database
        List<RoomType> roomTypeList = roomTypeRepository.findAll();
        assertThat(roomTypeList).hasSize(databaseSizeBeforeUpdate);
        RoomType testRoomType = roomTypeList.get(roomTypeList.size() - 1);
        assertThat(testRoomType.getTypeBed()).isEqualTo(UPDATED_TYPE_BED);
        assertThat(testRoomType.isBathroom()).isEqualTo(UPDATED_BATHROOM);
    }

    @Test
    @Transactional
    public void updateNonExistingRoomType() throws Exception {
        int databaseSizeBeforeUpdate = roomTypeRepository.findAll().size();

        // Create the RoomType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoomTypeMockMvc.perform(put("/api/room-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomType)))
            .andExpect(status().isBadRequest());

        // Validate the RoomType in the database
        List<RoomType> roomTypeList = roomTypeRepository.findAll();
        assertThat(roomTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRoomType() throws Exception {
        // Initialize the database
        roomTypeRepository.saveAndFlush(roomType);

        int databaseSizeBeforeDelete = roomTypeRepository.findAll().size();

        // Delete the roomType
        restRoomTypeMockMvc.perform(delete("/api/room-types/{id}", roomType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RoomType> roomTypeList = roomTypeRepository.findAll();
        assertThat(roomTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
