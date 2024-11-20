package PBL6.example.UNIME.dto.response;

import PBL6.example.UNIME.entity.Department;
import PBL6.example.UNIME.entity.DoctorDetail;
import PBL6.example.UNIME.entity.User;
import PBL6.example.UNIME.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DoctorResponse {

    Integer doctorId;

    String username;
    String password;
    String email;

    String doctorImage;
    String doctorName;
    String doctorAddress;
    String doctorPhoneNumber;
    boolean doctorGender;
    LocalDate doctorDateOfBirth;

    String departmentName;
    String doctorStatus;

    String doctordetailInformation;
    String doctordetailExperience;
    String doctordetailAwardRecognization;

}
