package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.request.PatientRequest;
import PBL6.example.UNIME.dto.response.PatientResponse;
import PBL6.example.UNIME.entity.Patient;
import PBL6.example.UNIME.entity.User;
import PBL6.example.UNIME.enums.Role;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.PatientRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class PatientService {

    private static final Logger log = LoggerFactory.getLogger(PatientService.class);
    PatientRepository patientRepository;
    UserService userService;

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE', 'DOCTOR')")
    public List<PatientResponse> getAllPatients(){
        List<Patient> patients = patientRepository.findAll();
        return patients.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @PostAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE', 'DOCTOR')")
    public PatientResponse getPatientById(Integer patient_id){
        return mapToResponse(patientRepository.findById(patient_id)
                .orElseThrow(() -> new AppException(ErrorCode.PATIENT_NOT_FOUND)));
    }



    // update
    @PostAuthorize("returnObject.patientUsername == authentication.name")
    public PatientResponse updatePatient(String patient_username, PatientRequest request) {
        //1. kiểm tra tồn tại Patient theo Username
        Patient patient = patientRepository.findBypatientUserId(userService.getUserByUsername(patient_username))
                .orElseThrow(() -> new AppException(ErrorCode.PATIENT_NOT_FOUND));

        //2. Kiểm tra  mail cập nhật có trùng với tài khoản khác
        if(userService.ExitByEmail(request.getPatientEmail())){ // kiểm tra tồn tại email trong table User không
            User userByEmail = userService.getUserByEmail(request.getPatientEmail());
            if(!userByEmail.getUserId().equals(patient.getPatientUserId().getUserId())) {
                throw new AppException(ErrorCode.EMAIL_ALREADY_REGISTERED);
            }
        }
        // 3. cập nhật vào bảng User
        User user = new User();
        user.setPassword(request.getPatientPassword());
        user.setEmail(request.getPatientEmail());
        user.setImage(request.getPatientImage());
        userService.updateUser(patient.getPatientUserId().getUserId(), user );

        // 4. cập nhật vào bẳng Patient
        patient.setPatientName(request.getPatientName());
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientPhoneNumber(request.getPatientPhoneNumber());
        patient.setPatientDateOfBirth(request.getPatientDateOfBirth());

        return mapToResponse(patientRepository.save(patient));
    }

    @PostAuthorize("hasRole('ADMIN')")
    public void deletePatient(Integer patient_id) {
        Patient patient = patientRepository.findById(patient_id)
                .orElseThrow(() -> new AppException(ErrorCode.PATIENT_NOT_FOUND));
        patientRepository.deleteById(patient.getPatientId());
        userService.deleteUser(patient.getPatientUserId().getUserId());
    }
// ==== token

    public PatientResponse getMyInfo(String Username) {

        User user = userService.getUserByUsername(Username);
        Patient patient = patientRepository.findBypatientUserId(user)
                .orElseThrow(() -> new AppException(ErrorCode.PATIENT_NOT_FOUND));

        return mapToResponse(patient);
    }

// ==== public
    public PatientResponse createPatient(PatientRequest request) {

        //1. kiểm tra, khởi tạo user
        User user = new User();
        user.setUsername(request.getPatientUsername());
        user.setPassword(request.getPatientPassword());
        if(request.getPatientImage() == null){
            user.setImage("https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731150727/e3e8df1e56e1c8839457b42bdcd750e5_smkmhm.jpg");
        } else user.setImage(request.getPatientImage());
        user.setEmail(request.getPatientEmail());
        user.setRole(Role.PATIENT.name());

        //2. Tạo patient
        Patient patient = new Patient();
        patient.setPatientUserId(userService.createUser(user));
        patient.setPatientName(request.getPatientName());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientPhoneNumber(request.getPatientPhoneNumber());
        patient.setPatientDateOfBirth(request.getPatientDateOfBirth());

        return mapToResponse(patientRepository.save(patient));
    }

    // chuyển Patient => PatientResponse
    private PatientResponse mapToResponse(Patient patient) {

        return new PatientResponse(
                patient.getPatientId(),
                patient.getPatientUserId().getUserId(),
                patient.getPatientUserId().getUsername(),
                patient.getPatientUserId().getPassword(),
                patient.getPatientUserId().getEmail(),
                patient.getPatientUserId().getImage(),
                patient.getPatientName(),
                patient.getPatientAddress(),
                patient.getPatientPhoneNumber(),
                patient.isPatientGender(),
                patient.getPatientDateOfBirth()
        );
    }


}
