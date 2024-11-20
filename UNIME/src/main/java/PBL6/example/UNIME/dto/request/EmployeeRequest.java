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
public class EmployeeRequest {

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    @Size(min = 6, message = "INVALID_USERNAME_FORMAT")
    String employeeUsername;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    @Size(min = 8, message = "INVALID_PASSWORD_FORMAT")
    String employeePassword;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    @Email(message = "INVALID_EMAIL_FORMAT")
    String employeeEmail;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String employeeImage;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String employeeName;
    
    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    @Pattern(regexp = "^\\+84\\d{9,10}$", message = "INVALID_PHONE_NUMBER_FORMAT")
    String employeePhoneNumber;

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    Boolean employeeGender;

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    LocalDate employeeDateOfBirth;

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    String departmentName;

    String employeeStatus;

}
