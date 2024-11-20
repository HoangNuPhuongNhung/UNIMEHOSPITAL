package PBL6.example.UNIME.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceRequest {

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String serviceName;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String serviceImage;

    @NotEmpty(message = "MISSING_REQUIRED_FIELDS")
    String serviceDescription;

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    int servicePrice;

    @NotNull(message = "MISSING_REQUIRED_FIELDS")
    String departmentName;

}
