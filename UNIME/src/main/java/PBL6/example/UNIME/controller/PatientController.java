package PBL6.example.UNIME.controller;

import PBL6.example.UNIME.dto.request.PatientCreateRequest;
import PBL6.example.UNIME.dto.request.PatientUpdateRequest;
import PBL6.example.UNIME.dto.response.ApiResponse;
import PBL6.example.UNIME.dto.response.PatientResponse;
import PBL6.example.UNIME.service.PatientService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class PatientController {
    PatientService patientService;

    @PostMapping
    ApiResponse<PatientResponse> createPatient(@RequestBody @Valid PatientCreateRequest request) {
        ApiResponse<PatientResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(patientService.createPatient(request));
        return apiResponse;
    }

    @GetMapping
    ApiResponse<List<PatientResponse>> getAllPatients() {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return ApiResponse.<List<PatientResponse>>builder()
                .result(patientService.getAllPatients())
                .build();
    }

    @GetMapping("/myInfo")
    ApiResponse<PatientResponse> getMyInfo(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return ApiResponse.<PatientResponse>builder()
                .result(patientService.getMyInfo())
                .build();
    }
    @GetMapping("/{patient_id}")
    ApiResponse<PatientResponse> getPatient(@PathVariable("patient_id") Integer patient_id){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return ApiResponse.<PatientResponse>builder()
                .result(patientService.getPatientById(patient_id))
                .build();
    }

    @PutMapping("/{patient_id}")
    ApiResponse<PatientResponse> updatePatient(@PathVariable Integer patient_id, @RequestBody PatientUpdateRequest request){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return ApiResponse.<PatientResponse>builder()
                .result(patientService.updatePatient(patient_id, request))
                .build();
    }

    @DeleteMapping("/{patient_id}")
    ApiResponse<String> deleteUser(@PathVariable Integer patient_id){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        patientService.deletePatient(patient_id);
        return ApiResponse.<String>builder()
                .result( "Patient has been deleted")
                .build();
    }
}
