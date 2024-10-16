package PBL6.example.UNIME.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "timework")
public class Timework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "timework_id")
    Integer id;

    @Column(name = "day_of_week", nullable = false, length = 20)
    String dayOfWeek;

    @Column(name = "start_time", nullable = false)
    LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    LocalTime endTime;
}
