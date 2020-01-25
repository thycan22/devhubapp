package com.devarchi.bookapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.devarchi.bookapp.web.rest.TestUtil;

public class RoomTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoomType.class);
        RoomType roomType1 = new RoomType();
        roomType1.setId(1L);
        RoomType roomType2 = new RoomType();
        roomType2.setId(roomType1.getId());
        assertThat(roomType1).isEqualTo(roomType2);
        roomType2.setId(2L);
        assertThat(roomType1).isNotEqualTo(roomType2);
        roomType1.setId(null);
        assertThat(roomType1).isNotEqualTo(roomType2);
    }
}
