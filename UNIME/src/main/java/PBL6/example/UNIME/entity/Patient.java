package PBL6.example.UNIME.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "patient")
public class Patient{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    Integer patientId;

    @OneToOne
    @JoinColumn(name = "patient_userId", referencedColumnName = "user_id", nullable = false, unique = true)
    User patientUserId;

    @Column(name = "patient_name", nullable = false, length = 255)
    String patientName;

    @Column(name = "patient_address", length = 255)
    String patientAddress;

    @Column(name = "patient_phonenumber", nullable = false, length = 20)
    String patientPhoneNumber;

    @Column(name = "patient_gender", nullable = false)
    boolean patientGender;

    @Column(name = "patient_date_of_birth")
    LocalDate patientDateOfBirth;
}
