package com.jhlali.fr.web.rest;

import com.jhlali.fr.domain.Coach;
import com.jhlali.fr.repository.CoachRepository;
import com.jhlali.fr.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jhlali.fr.domain.Coach}.
 */
@RestController
@RequestMapping("/api")
public class CoachResource {

    private final Logger log = LoggerFactory.getLogger(CoachResource.class);

    private static final String ENTITY_NAME = "coach";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoachRepository coachRepository;

    public CoachResource(CoachRepository coachRepository) {
        this.coachRepository = coachRepository;
    }

    /**
     * {@code POST  /coaches} : Create a new coach.
     *
     * @param coach the coach to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new coach, or with status {@code 400 (Bad Request)} if the coach has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/coaches")
    public ResponseEntity<Coach> createCoach(@Valid @RequestBody Coach coach) throws URISyntaxException {
        log.debug("REST request to save Coach : {}", coach);
        if (coach.getId() != null) {
            throw new BadRequestAlertException("A new coach cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Coach result = coachRepository.save(coach);
        return ResponseEntity.created(new URI("/api/coaches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /coaches} : Updates an existing coach.
     *
     * @param coach the coach to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coach,
     * or with status {@code 400 (Bad Request)} if the coach is not valid,
     * or with status {@code 500 (Internal Server Error)} if the coach couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/coaches")
    public ResponseEntity<Coach> updateCoach(@Valid @RequestBody Coach coach) throws URISyntaxException {
        log.debug("REST request to update Coach : {}", coach);
        if (coach.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Coach result = coachRepository.save(coach);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coach.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /coaches} : get all the coaches.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of coaches in body.
     */
    @GetMapping("/coaches")
    public List<Coach> getAllCoaches() {
        log.debug("REST request to get all Coaches");
        return coachRepository.findAll();
    }

    /**
     * {@code GET  /coaches/:id} : get the "id" coach.
     *
     * @param id the id of the coach to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the coach, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/coaches/{id}")
    public ResponseEntity<Coach> getCoach(@PathVariable Long id) {
        log.debug("REST request to get Coach : {}", id);
        Optional<Coach> coach = coachRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(coach);
    }

    /**
     * {@code DELETE  /coaches/:id} : delete the "id" coach.
     *
     * @param id the id of the coach to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/coaches/{id}")
    public ResponseEntity<Void> deleteCoach(@PathVariable Long id) {
        log.debug("REST request to delete Coach : {}", id);
        coachRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
