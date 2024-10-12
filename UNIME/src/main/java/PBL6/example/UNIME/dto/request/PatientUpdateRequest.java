package PBL6.example.UNIME.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class PatientUpdateRequest {
    @NotEmpty(message="MISSING_REQUIRED_FIELDS")
    Integer userId;

    @NotEmpty(message="MISSING_REQUIRED_FIELDS")
    @Size(min = 6, message = "INVALID_USERNAME_FORMAT")
    String patientUsername;

    @NotEmpty(message="MISSING_REQUIRED_FIELDS")
    @Size(min = 8, message = "INVALID_PASSWORD_FORMAT")
    String patientPassword;

    @NotEmpty(message="MISSING_REQUIRED_FIELDS")
    @Email(message = "INVALID_EMAIL_FORMAT")
    String patientEmail;

    @NotEmpty(message="MISSING_REQUIRED_FIELDS")
    String patientName;

    String patientAddress;

    @NotEmpty(message="MISSING_REQUIRED_FIELDS")
    @Pattern(regexp = "^\\+84\\d{9,10}$", message = "INVALID_PHONE_NUMBER_FORMAT")
    String patientPhoneNumber;

    @NotNull(message="MISSING_REQUIRED_FIELDS")
    Boolean patientGender;

    @NotNull(message="MISSING_REQUIRED_FIELDS")
    LocalDate patientDateOfBirth;

}