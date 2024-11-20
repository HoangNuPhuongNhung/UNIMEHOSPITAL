package PBL6.example.UNIME.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MailRequest {
    @NotEmpty(message="MISSING_REQUIRED_FIELDS")
    @Email(message = "INVALID_EMAIL_FORMAT")
    String email;
}
