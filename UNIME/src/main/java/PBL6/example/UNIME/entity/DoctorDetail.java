package PBL6.example.UNIME.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "doctor_detail")
public class DoctorDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctordetail_id")
    Integer doctordetailId;

    @Column(name = "doctordetail_information", nullable = true, columnDefinition = "TEXT")
    String doctordetailInformation;

    @Column(name = "doctordetail_experience", nullable = true, columnDefinition = "TEXT")
    String doctordetailExperience;

    @Column(name = "doctordetail_award_recognization", nullable = true, columnDefinition = "TEXT")
    String doctordetailAwardRecognization;
}
