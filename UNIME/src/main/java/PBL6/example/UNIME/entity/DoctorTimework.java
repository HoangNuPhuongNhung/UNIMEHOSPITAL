package PBL6.example.UNIME.entity;

import PBL6.example.UNIME.enums.DoctorTimeworkStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnTransformer;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "doctor_timework")
public class DoctorTimework {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctortimework_id")
    Integer id;

    @Column(name = "doctortimework_year", nullable = false)
    Integer year;

    @Column(name = "week_of_year", nullable = false)
    Integer weekOfYear;

    @ManyToOne
    @JoinColumn(name = "timework_id", nullable = false)
    Timework timeWork;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    Doctor doctor;

    @Column(name = "doctortimework_status", nullable = false, length = 255)
    String status = DoctorTimeworkStatus.Available.name();


}
