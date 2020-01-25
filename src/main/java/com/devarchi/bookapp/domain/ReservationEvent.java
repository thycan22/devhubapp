package com.devarchi.bookapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A ReservationEvent.
 */
@Entity
@Table(name = "reservation_event")
public class ReservationEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "start", nullable = false)
    private LocalDate start;

    @NotNull
    @Column(name = "jhi_end", nullable = false)
    private LocalDate end;

    @Column(name = "text")
    private String text;

    @Column(name = "nb_day")
    private Integer nbDay;

    @NotNull
    @Column(name = "nb_adult", nullable = false)
    private Integer nbAdult;

    @Column(name = "nb_child")
    private Integer nbChild;

    @ManyToOne
    @JsonIgnoreProperties("reservationEvents")
    private Resource resource;

    @ManyToOne
    @JsonIgnoreProperties("reservationEvents")
    private Price price;

    @ManyToOne
    @JsonIgnoreProperties("reservationCommands")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStart() {
        return start;
    }

    public ReservationEvent start(LocalDate start) {
        this.start = start;
        return this;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public ReservationEvent end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public String getText() {
        return text;
    }

    public ReservationEvent text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getNbDay() {
        return nbDay;
    }

    public ReservationEvent nbDay(Integer nbDay) {
        this.nbDay = nbDay;
        return this;
    }

    public void setNbDay(Integer nbDay) {
        this.nbDay = nbDay;
    }

    public Integer getNbAdult() {
        return nbAdult;
    }

    public ReservationEvent nbAdult(Integer nbAdult) {
        this.nbAdult = nbAdult;
        return this;
    }

    public void setNbAdult(Integer nbAdult) {
        this.nbAdult = nbAdult;
    }

    public Integer getNbChild() {
        return nbChild;
    }

    public ReservationEvent nbChild(Integer nbChild) {
        this.nbChild = nbChild;
        return this;
    }

    public void setNbChild(Integer nbChild) {
        this.nbChild = nbChild;
    }

    public Resource getResource() {
        return resource;
    }

    public ReservationEvent resource(Resource resource) {
        this.resource = resource;
        return this;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public Price getPrice() {
        return price;
    }

    public ReservationEvent price(Price price) {
        this.price = price;
        return this;
    }

    public void setPrice(Price price) {
        this.price = price;
    }

    public Customer getCustomer() {
        return customer;
    }

    public ReservationEvent customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReservationEvent)) {
            return false;
        }
        return id != null && id.equals(((ReservationEvent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ReservationEvent{" +
            "id=" + getId() +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", text='" + getText() + "'" +
            ", nbDay=" + getNbDay() +
            ", nbAdult=" + getNbAdult() +
            ", nbChild=" + getNbChild() +
            "}";
    }
}
