package PBL6.example.UNIME.service;

import PBL6.example.UNIME.PatientRepository;
import PBL6.example.UNIME.dto.request.PatientCreationDTO;
import PBL6.example.UNIME.dto.request.PatientUpdateDTO;
import PBL6.example.UNIME.dto.response.PatientResponse;
import PBL6.example.UNIME.entity.Patient;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class PatientService {

    PatientRepository patientRepository;

    public PatientResponse createPatient(PatientCreationDTO request) {
        Patient patient = new Patient();

        if(patientRepository.existsBypatientUsername(request.getPatientUsername())) {
            throw new AppException(ErrorCode.USERNAME_ALREADY_TAKEN);
        }
        if(patientRepository.existsBypatientEmail(request.getPatientEmail())){
            throw new AppException(ErrorCode.EMAIL_ALREADY_REGISTERED);
        }
        patient.setPatientUsername(request.getPatientUsername());
//        PasswordEncoder
        patient.setPatientPassword(request.getPatientPassword());
        patient.setPatientEmail(request.getPatientEmail());
        patient.setPatientName(request.getPatientName());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientPhoneNumber(request.getPatientPhoneNumber());
        patient.setPatientDateOfBirth(request.getPatientDateOfBirth());

        return mapToResponse(patientRepository.save(patient));
    }


    public List<PatientResponse> getAllPatients(){
        List<Patient> patients = patientRepository.findAll();
        return patients.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // get Patient theo id
    public PatientResponse getPatientById(Integer patient_id){
        return mapToResponse(patientRepository.findById(patient_id)
                .orElseThrow(() -> new AppException(ErrorCode.PATIENT_NOT_FOUND)));
    }

    // update
    public PatientResponse updatePatient(Integer patient_id, PatientUpdateDTO request) {
        Patient patient = patientRepository.findById(patient_id)
                .orElseThrow(() -> new AppException(ErrorCode.PATIENT_NOT_FOUND));

        if(patientRepository.existsBypatientEmail(request.getPatientEmail())){
            throw new AppException(ErrorCode.EMAIL_ALREADY_REGISTERED);
        }

        patient.setPatientPassword(request.getPatientPassword());
        patient.setPatientEmail(request.getPatientEmail());
        patient.setPatientName(request.getPatientName());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientPhoneNumber(request.getPatientPhoneNumber());
        patient.setPatientDateOfBirth(request.getPatientDateOfBirth());

        return mapToResponse(patientRepository.save(patient));

    }

    public void deletePatient(Integer patient_id) {
        Patient patient = patientRepository.findById(patient_id)
                .orElseThrow(() -> new AppException(ErrorCode.PATIENT_NOT_FOUND));
        patientRepository.deleteById(patient.getPatientId());
    }

    // chuyển Patient => PatientResponse
    private PatientResponse mapToResponse(Patient patient) {
        return new PatientResponse(
                patient.getPatientId(),
                patient.getPatientUsername(),
                patient.getPatientPassword(),
                patient.getPatientEmail(),
                patient.getPatientName(),
                patient.getPatientAddress(),
                patient.getPatientPhoneNumber(),
                patient.isPatientGender(),
                patient.getPatientDateOfBirth()
        );
    }
}
