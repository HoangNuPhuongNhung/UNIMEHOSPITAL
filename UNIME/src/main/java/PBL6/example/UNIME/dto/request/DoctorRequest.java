package PBL6.example.UNIME.dto.request;

import PBL6.example.UNIME.entity.Department;
import PBL6.example.UNIME.entity.DoctorDetail;
import PBL6.example.UNIME.entity.User;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorRequest {

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    @Size(min = 6, message = "INVALID_USERNAME_FORMAT")
    String doctorUsername;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    @Size(min = 8, message = "INVALID_PASSWORD_FORMAT")
    String doctorPassword;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    @Email(message = "INVALID_EMAIL_FORMAT")
    String doctorEmail;

    String doctorImage;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String doctorName;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String doctorAddress;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    @Pattern(regexp = "^\\+84\\d{9,10}$", message = "INVALID_PHONE_NUMBER_FORMAT")
    String doctorPhoneNumber;

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    boolean doctorGender;

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    LocalDate doctorDateOfBirth;

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    String departmentName;

    String doctorStatus;

    String doctordetailInformation;

    String doctordetailExperience;

    String doctordetailAwardRecognization;
}
