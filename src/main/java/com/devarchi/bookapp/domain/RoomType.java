package com.devarchi.bookapp.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A RoomType.
 */
@Entity
@Table(name = "room_type")
public class RoomType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "type_bed")
    private String typeBed;

    @Column(name = "bathroom")
    private Boolean bathroom;

    @OneToMany(mappedBy = "roomType")
    private Set<Resource> resources = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeBed() {
        return typeBed;
    }

    public RoomType typeBed(String typeBed) {
        this.typeBed = typeBed;
        return this;
    }

    public void setTypeBed(String typeBed) {
        this.typeBed = typeBed;
    }

    public Boolean isBathroom() {
        return bathroom;
    }

    public RoomType bathroom(Boolean bathroom) {
        this.bathroom = bathroom;
        return this;
    }

    public void setBathroom(Boolean bathroom) {
        this.bathroom = bathroom;
    }

    public Set<Resource> getResources() {
        return resources;
    }

    public RoomType resources(Set<Resource> resources) {
        this.resources = resources;
        return this;
    }

    public RoomType addResource(Resource resource) {
        this.resources.add(resource);
        resource.setRoomType(this);
        return this;
    }

    public RoomType removeResource(Resource resource) {
        this.resources.remove(resource);
        resource.setRoomType(null);
        return this;
    }

    public void setResources(Set<Resource> resources) {
        this.resources = resources;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RoomType)) {
            return false;
        }
        return id != null && id.equals(((RoomType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RoomType{" +
            "id=" + getId() +
            ", typeBed='" + getTypeBed() + "'" +
            ", bathroom='" + isBathroom() + "'" +
            "}";
    }
}
