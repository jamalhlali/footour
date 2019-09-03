package com.jhlali.fr.web.rest;

import com.jhlali.fr.FootourApp;
import com.jhlali.fr.domain.Organizer;
import com.jhlali.fr.repository.OrganizerRepository;
import com.jhlali.fr.web.rest.errors.ExceptionTranslator;

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

import static com.jhlali.fr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OrganizerResource} REST controller.
 */
@SpringBootTest(classes = FootourApp.class)
public class OrganizerResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private OrganizerRepository organizerRepository;

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

    private MockMvc restOrganizerMockMvc;

    private Organizer organizer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrganizerResource organizerResource = new OrganizerResource(organizerRepository);
        this.restOrganizerMockMvc = MockMvcBuilders.standaloneSetup(organizerResource)
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
    public static Organizer createEntity(EntityManager em) {
        Organizer organizer = new Organizer()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .phoneNumber(DEFAULT_PHONE_NUMBER);
        return organizer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Organizer createUpdatedEntity(EntityManager em) {
        Organizer organizer = new Organizer()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        return organizer;
    }

    @BeforeEach
    public void initTest() {
        organizer = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrganizer() throws Exception {
        int databaseSizeBeforeCreate = organizerRepository.findAll().size();

        // Create the Organizer
        restOrganizerMockMvc.perform(post("/api/organizers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organizer)))
            .andExpect(status().isCreated());

        // Validate the Organizer in the database
        List<Organizer> organizerList = organizerRepository.findAll();
        assertThat(organizerList).hasSize(databaseSizeBeforeCreate + 1);
        Organizer testOrganizer = organizerList.get(organizerList.size() - 1);
        assertThat(testOrganizer.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testOrganizer.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testOrganizer.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testOrganizer.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void createOrganizerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = organizerRepository.findAll().size();

        // Create the Organizer with an existing ID
        organizer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrganizerMockMvc.perform(post("/api/organizers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organizer)))
            .andExpect(status().isBadRequest());

        // Validate the Organizer in the database
        List<Organizer> organizerList = organizerRepository.findAll();
        assertThat(organizerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = organizerRepository.findAll().size();
        // set the field null
        organizer.setFirstName(null);

        // Create the Organizer, which fails.

        restOrganizerMockMvc.perform(post("/api/organizers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organizer)))
            .andExpect(status().isBadRequest());

        List<Organizer> organizerList = organizerRepository.findAll();
        assertThat(organizerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = organizerRepository.findAll().size();
        // set the field null
        organizer.setLastName(null);

        // Create the Organizer, which fails.

        restOrganizerMockMvc.perform(post("/api/organizers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organizer)))
            .andExpect(status().isBadRequest());

        List<Organizer> organizerList = organizerRepository.findAll();
        assertThat(organizerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrganizers() throws Exception {
        // Initialize the database
        organizerRepository.saveAndFlush(organizer);

        // Get all the organizerList
        restOrganizerMockMvc.perform(get("/api/organizers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(organizer.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())));
    }
    
    @Test
    @Transactional
    public void getOrganizer() throws Exception {
        // Initialize the database
        organizerRepository.saveAndFlush(organizer);

        // Get the organizer
        restOrganizerMockMvc.perform(get("/api/organizers/{id}", organizer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(organizer.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrganizer() throws Exception {
        // Get the organizer
        restOrganizerMockMvc.perform(get("/api/organizers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrganizer() throws Exception {
        // Initialize the database
        organizerRepository.saveAndFlush(organizer);

        int databaseSizeBeforeUpdate = organizerRepository.findAll().size();

        // Update the organizer
        Organizer updatedOrganizer = organizerRepository.findById(organizer.getId()).get();
        // Disconnect from session so that the updates on updatedOrganizer are not directly saved in db
        em.detach(updatedOrganizer);
        updatedOrganizer
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER);

        restOrganizerMockMvc.perform(put("/api/organizers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrganizer)))
            .andExpect(status().isOk());

        // Validate the Organizer in the database
        List<Organizer> organizerList = organizerRepository.findAll();
        assertThat(organizerList).hasSize(databaseSizeBeforeUpdate);
        Organizer testOrganizer = organizerList.get(organizerList.size() - 1);
        assertThat(testOrganizer.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testOrganizer.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testOrganizer.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testOrganizer.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingOrganizer() throws Exception {
        int databaseSizeBeforeUpdate = organizerRepository.findAll().size();

        // Create the Organizer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrganizerMockMvc.perform(put("/api/organizers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organizer)))
            .andExpect(status().isBadRequest());

        // Validate the Organizer in the database
        List<Organizer> organizerList = organizerRepository.findAll();
        assertThat(organizerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrganizer() throws Exception {
        // Initialize the database
        organizerRepository.saveAndFlush(organizer);

        int databaseSizeBeforeDelete = organizerRepository.findAll().size();

        // Delete the organizer
        restOrganizerMockMvc.perform(delete("/api/organizers/{id}", organizer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Organizer> organizerList = organizerRepository.findAll();
        assertThat(organizerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Organizer.class);
        Organizer organizer1 = new Organizer();
        organizer1.setId(1L);
        Organizer organizer2 = new Organizer();
        organizer2.setId(organizer1.getId());
        assertThat(organizer1).isEqualTo(organizer2);
        organizer2.setId(2L);
        assertThat(organizer1).isNotEqualTo(organizer2);
        organizer1.setId(null);
        assertThat(organizer1).isNotEqualTo(organizer2);
    }
}
