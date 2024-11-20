package PBL6.example.UNIME.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceResponse {
    int serviceId;
    String serviceName;
    String serviceImage;
    String serviceDescription;
    Integer servicePrice;
    String departmentName;
}
