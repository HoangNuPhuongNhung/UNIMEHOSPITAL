package PBL6.example.UNIME.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeResponse {
    int employeeId;

    String employeeUsername;
    String employeePassword;
    String employeeEmail;

    String employeeImage;
    String employeeName;
    String employeePhoneNumber;
    boolean employeeGender;
    String employeeStatus;

    String departmentName;
}
