package PBL6.example.UNIME.entity;


import PBL6.example.UNIME.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id", nullable = false, updatable = false)
    Integer appointmentId;

    @Column(name = "patient_id", nullable = false)
    Integer patientId;

    @Column(name = "doctortimework_id", nullable = false)
    Integer doctortimeworkId;

    @Column(name = "employee_id", nullable = false)
    Integer employeeId;

    @Column(name = "doctorservice_id", nullable = false)
    Integer doctorserviceId;

    @Column(name = "appointment_created_at", nullable = false, updatable = false)
    LocalDateTime appointmentCreatedAt = LocalDateTime.now();

    @Column(name = "appointment_status", nullable = false)
    String appointmentStatus = AppointmentStatus.Pending.name();

    @Column(name = "appointment_note")
    String appointmentNote;

}
