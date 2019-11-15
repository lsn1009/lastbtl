package com.thitructuyen.web.rest;

import com.thitructuyen.domain.Loai;
import com.thitructuyen.repository.LoaiRepository;
import com.thitructuyen.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link com.thitructuyen.domain.Loai}.
 */
@RestController
@RequestMapping("/api")
public class LoaiResource {

    private final Logger log = LoggerFactory.getLogger(LoaiResource.class);

    private static final String ENTITY_NAME = "loai";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LoaiRepository loaiRepository;

    public LoaiResource(LoaiRepository loaiRepository) {
        this.loaiRepository = loaiRepository;
    }

    /**
     * {@code POST  /loais} : Create a new loai.
     *
     * @param loai the loai to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new loai, or with status {@code 400 (Bad Request)} if the loai has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/loais")
    public ResponseEntity<Loai> createLoai(@Valid @RequestBody Loai loai) throws URISyntaxException {
        log.debug("REST request to save Loai : {}", loai);
        if (loai.getId() != null) {
            throw new BadRequestAlertException("A new loai cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Loai result = loaiRepository.save(loai);
        return ResponseEntity.created(new URI("/api/loais/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /loais} : Updates an existing loai.
     *
     * @param loai the loai to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated loai,
     * or with status {@code 400 (Bad Request)} if the loai is not valid,
     * or with status {@code 500 (Internal Server Error)} if the loai couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/loais")
    public ResponseEntity<Loai> updateLoai(@Valid @RequestBody Loai loai) throws URISyntaxException {
        log.debug("REST request to update Loai : {}", loai);
        if (loai.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Loai result = loaiRepository.save(loai);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, loai.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /loais} : get all the loais.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of loais in body.
     */
    @GetMapping("/loais")
    public List<Loai> getAllLoais() {
        log.debug("REST request to get all Loais");
        return loaiRepository.findAll();
    }

    /**
     * {@code GET  /loais/:id} : get the "id" loai.
     *
     * @param id the id of the loai to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the loai, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/loais/{id}")
    public ResponseEntity<Loai> getLoai(@PathVariable Long id) {
        log.debug("REST request to get Loai : {}", id);
        Optional<Loai> loai = loaiRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(loai);
    }

    /**
     * {@code DELETE  /loais/:id} : delete the "id" loai.
     *
     * @param id the id of the loai to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/loais/{id}")
    public ResponseEntity<Void> deleteLoai(@PathVariable Long id) {
        log.debug("REST request to delete Loai : {}", id);
        loaiRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
