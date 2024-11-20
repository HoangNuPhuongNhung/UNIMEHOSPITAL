package PBL6.example.UNIME.dto.request;


import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorServiceRequest {
    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    Integer doctorID;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    Integer serviceID;
}
