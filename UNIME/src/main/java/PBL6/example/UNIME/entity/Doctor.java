package PBL6.example.UNIME.entity;

import PBL6.example.UNIME.enums.Status;
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
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    Integer doctorId;

    @OneToOne
    @JoinColumn(name = "doctor_userId", referencedColumnName = "user_id", nullable = false, unique = true)
    User doctorUserId;

    @Column(name = "doctor_name", nullable = false, length = 255)
    String doctorName;

    @Column(name = "doctor_address", nullable = false, length = 255)
    String doctorAddress;

    @Column(name = "doctor_phonenumber", nullable = false, length = 20)
    String doctorPhoneNumber;

    @Column(name = "doctor_gender", nullable = false)
    boolean doctorGender;

    @Column(name = "doctor_date_of_birth")
    LocalDate doctorDateOfBirth;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id", nullable = false)
    Department department ;

    @OneToOne
    @JoinColumn(name = "doctordetail_id", referencedColumnName = "doctordetail_id", unique = true)
    DoctorDetail doctorDetail;

    @Column(name = "doctor_status", nullable = false)
    String doctorStatus = Status.ON.name();

}
