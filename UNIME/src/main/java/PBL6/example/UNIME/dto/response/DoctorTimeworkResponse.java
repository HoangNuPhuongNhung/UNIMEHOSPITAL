package PBL6.example.UNIME.dto.response;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorTimeworkResponse {
    Integer doctorTimeworkId;
    Integer doctortimeworkYear;
    Integer weekOfYear;

    String dayOfWeek;
    String startTime;
    String endTime;

    Integer doctorId;
    String doctortimeworkStatus;

}
