package PBL6.example.UNIME.dto.request;

import PBL6.example.UNIME.enums.DayOfWeek;
import PBL6.example.UNIME.enums.DoctorTimeworkStatus;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorTimeworkRequest {

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    Integer doctortimeworkYear;

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    Integer weekOfYear;

    //
    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String dayOfWeek;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String startTime;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String endTime;
    //

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    Integer doctorId;


    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String doctortimeworkStatus;

    public void validateRequest() {
        // Kiểm tra CHECK_DOCTOR_TIMEWORK_STATUS
        if (!(DoctorTimeworkStatus.Available.name().equals(doctortimeworkStatus)
                || DoctorTimeworkStatus.Busy.name().equals(doctortimeworkStatus))) {
            throw new AppException(ErrorCode.INVALID_KEY);
        }

        // Kiểm tra CHECK_WEEK_OF_YEAR
        if (weekOfYear == null || weekOfYear < 0 || weekOfYear >= 54) {
            throw new AppException(ErrorCode.INVALID_KEY);
        }
    }

}
