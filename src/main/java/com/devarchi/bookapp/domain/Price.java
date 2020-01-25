package com.devarchi.bookapp.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.devarchi.bookapp.domain.enumeration.Season;

/**
 * A Price.
 */
@Entity
@Table(name = "price")
public class Price implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "price")
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_period")
    private Season statusPeriod;

    @OneToMany(mappedBy = "price")
    private Set<ReservationEvent> reservationEvents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public Price price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Season getStatusPeriod() {
        return statusPeriod;
    }

    public Price statusPeriod(Season statusPeriod) {
        this.statusPeriod = statusPeriod;
        return this;
    }

    public void setStatusPeriod(Season statusPeriod) {
        this.statusPeriod = statusPeriod;
    }

    public Set<ReservationEvent> getReservationEvents() {
        return reservationEvents;
    }

    public Price reservationEvents(Set<ReservationEvent> reservationEvents) {
        this.reservationEvents = reservationEvents;
        return this;
    }

    public Price addReservationEvent(ReservationEvent reservationEvent) {
        this.reservationEvents.add(reservationEvent);
        reservationEvent.setPrice(this);
        return this;
    }

    public Price removeReservationEvent(ReservationEvent reservationEvent) {
        this.reservationEvents.remove(reservationEvent);
        reservationEvent.setPrice(null);
        return this;
    }

    public void setReservationEvents(Set<ReservationEvent> reservationEvents) {
        this.reservationEvents = reservationEvents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Price)) {
            return false;
        }
        return id != null && id.equals(((Price) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Price{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", statusPeriod='" + getStatusPeriod() + "'" +
            "}";
    }
}
