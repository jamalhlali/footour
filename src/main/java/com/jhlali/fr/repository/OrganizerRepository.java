package com.jhlali.fr.repository;

import com.jhlali.fr.domain.Organizer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Organizer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrganizerRepository extends JpaRepository<Organizer, Long> {

}
