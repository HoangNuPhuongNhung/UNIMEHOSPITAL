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
@Table(name = "patient",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "patient_username"),
                @UniqueConstraint(columnNames = "patient_email")
        })
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    int patientId;  // Thay đổi từ patient_id sang patientId

    @Column(name = "patient_username", nullable = false, length = 255)
    String patientUsername;

    @Column(name = "patient_password", nullable = false, columnDefinition = "TEXT")
    String patientPassword;  // Thay đổi từ patient_password sang patientPassword

    @Column(name = "patient_email", nullable = false, length = 255)
    String patientEmail;  // Thay đổi từ patient_email sang patientEmail

    @Column(name = "patient_name", nullable = false, length = 255)
    String patientName;  // Thay đổi từ patient_name sang patientName

    @Column(name = "patient_address", length = 255)
    String patientAddress;  // Thay đổi từ patient_address sang patientAddress

    @Column(name = "patient_phonenumber", nullable = false, length = 20)
    String patientPhoneNumber;  // Thay đổi từ patient_phonenumber sang patientPhoneNumber

    @Column(name = "patient_gender", nullable = false)
    boolean patientGender;  // Thay đổi từ patient_gender sang patientGender

    @Column(name = "patient_date_of_birth")
    LocalDate patientDateOfBirth;  // Thay đổi từ patient_date_of_birth sang patientDateOfBirth
}
