package com.devarchi.bookapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.devarchi.bookapp.web.rest.TestUtil;

public class ReservationEventTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReservationEvent.class);
        ReservationEvent reservationEvent1 = new ReservationEvent();
        reservationEvent1.setId(1L);
        ReservationEvent reservationEvent2 = new ReservationEvent();
        reservationEvent2.setId(reservationEvent1.getId());
        assertThat(reservationEvent1).isEqualTo(reservationEvent2);
        reservationEvent2.setId(2L);
        assertThat(reservationEvent1).isNotEqualTo(reservationEvent2);
        reservationEvent1.setId(null);
        assertThat(reservationEvent1).isNotEqualTo(reservationEvent2);
    }
}
