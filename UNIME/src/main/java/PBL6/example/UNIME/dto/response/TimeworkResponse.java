package PBL6.example.UNIME.dto.response;

import PBL6.example.UNIME.enums.DayOfWeek;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TimeworkResponse {
    int timeworkId;
    String dayOfWeek;
    String startTime;
    String endTime;
}
