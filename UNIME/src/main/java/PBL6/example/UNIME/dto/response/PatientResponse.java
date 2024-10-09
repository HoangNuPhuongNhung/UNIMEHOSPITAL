package PBL6.example.UNIME.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PatientResponse {
    int patientId;
    String patientUsername;
    String patientPassword;
    String patientEmail;
    String patientName;
    String patientAddress;
    String patientPhoneNumber;
    boolean patientGender;
    LocalDate patientDateOfBirth;

}
