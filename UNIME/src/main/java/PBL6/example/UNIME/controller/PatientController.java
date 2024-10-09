package PBL6.example.UNIME.controller;

import PBL6.example.UNIME.dto.request.PatientCreationDTO;
import PBL6.example.UNIME.dto.request.PatientUpdateDTO;
import PBL6.example.UNIME.dto.response.ApiResponse;
import PBL6.example.UNIME.dto.response.PatientResponse;
import PBL6.example.UNIME.service.PatientService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class PatientController {
    PatientService patientService;

    @PostMapping
    ApiResponse<PatientResponse> createPatient(@RequestBody @Valid PatientCreationDTO request) {
        ApiResponse<PatientResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(patientService.createPatient(request));
        return apiResponse;
    }

    @GetMapping
    List<PatientResponse> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{patient_id}")
    PatientResponse getPatient(@PathVariable("patient_id") Integer patient_id){
        return patientService.getPatientById(patient_id);
    }

    @PutMapping("/{patient_id}")
    PatientResponse updatePatient(@PathVariable Integer patient_id, @RequestBody PatientUpdateDTO request){
        return patientService.updatePatient(patient_id, request);
    }

    @DeleteMapping("/{patient_id}")
    String deleteUser(@PathVariable Integer patient_id){
        patientService.deletePatient(patient_id);
        return "Patient has been deleted";
    }
}
