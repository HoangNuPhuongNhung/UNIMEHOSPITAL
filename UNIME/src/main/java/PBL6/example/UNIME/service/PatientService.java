package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.request.PatientUpdateRequest;
import PBL6.example.UNIME.entity.User;
import PBL6.example.UNIME.enums.Role;
import PBL6.example.UNIME.repository.PatientRepository;
import PBL6.example.UNIME.dto.request.PatientCreateRequest;
import PBL6.example.UNIME.dto.response.PatientResponse;
import PBL6.example.UNIME.entity.Patient;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class PatientService {

    PatientRepository patientRepository;
    UserService userService;

    public PatientResponse createPatient(PatientCreateRequest request) {

        //1. kiểm tra, khởi tạo user
        User userTest = new User();
        userTest.setUsername(request.getPatientUsername());
        userTest.setPassword(request.getPatientPassword());
        userTest.setEmail(request.getPatientEmail());
        userTest.setRole(Role.PATIENT.name());
        User user = userService.createUser(userTest);

        //2. Tạo patient
        Patient patient = new Patient();
        patient.setPatientUserId(user);
        patient.setPatientName(request.getPatientName());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientPhoneNumber(request.getPatientPhoneNumber());
        patient.setPatientDateOfBirth(request.getPatientDateOfBirth());

        return mapToResponse(patientRepository.save(patient));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<PatientResponse> getAllPatients(){
        List<Patient> patients = patientRepository.findAll();
        return patients.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @PostAuthorize("returnObject.patientUsername == authentication.name")
    public PatientResponse getPatientById(Integer patient_id){
        return mapToResponse(patientRepository.findById(patient_id)
                .orElseThrow(() -> new AppException(ErrorCode.PATIENT_NOT_FOUND)));
    }


    public PatientResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userService.getUserByUsername(name);
        Patient patient = patientRepository.findBypatientUserId(user).orElseThrow(
                ()-> new AppException(ErrorCode.USER_NOT_EXITED));

        return mapToResponse(patient);
    }

    // update
    @PostAuthorize("returnObject.patientUsername == authentication.name")
    public PatientResponse updatePatient(Integer patient_id, PatientUpdateRequest request) {
        //1. kiểm tra tồn tại Patient theo ID
        Patient patient = patientRepository.findById(patient_id)
                .orElseThrow(() -> new AppException(ErrorCode.PATIENT_NOT_FOUND));

        //2. Kiểm tra username, mail cập nhaatj có trùng với tài khoản khác
        if(userService.ExitByEmail(request.getPatientEmail())){ // kiểm tra tồn tại email trong table User không
            User userByEmail = userService.getUserByEmail(request.getPatientEmail());
            if(!userByEmail.getUserId().equals(patient.getPatientUserId().getUserId())) {
                throw new AppException(ErrorCode.EMAIL_ALREADY_REGISTERED);
            }
        }
        if(userService.ExitByUsername(request.getPatientUsername())){ // kiểm tra tồn tại username trong table User không
            User userByUsername = userService.getUserByUsername(request.getPatientUsername());
            if(!userByUsername.getUserId().equals(patient.getPatientUserId().getUserId())) {
                throw new AppException(ErrorCode.USERNAME_ALREADY_TAKEN);
            }
        }
        // 3. cập nhật vào bảng User
        User user = patient.getPatientUserId();
        user.setUsername(request.getPatientUsername());
        user.setPassword(request.getPatientPassword());
        user.setEmail(request.getPatientEmail());

        // 4. cập nhật vào bẳng Patient
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientName(request.getPatientName());
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

    // chuyển Patient => PatientResponse
    private PatientResponse mapToResponse(Patient patient) {

        return new PatientResponse(
                patient.getPatientId(),
                patient.getPatientUserId().getUserId(),
                patient.getPatientUserId().getUsername(),
                patient.getPatientUserId().getPassword(),
                patient.getPatientUserId().getEmail(),
                patient.getPatientName(),
                patient.getPatientAddress(),
                patient.getPatientPhoneNumber(),
                patient.isPatientGender(),
                patient.getPatientDateOfBirth()
        );
    }


}
