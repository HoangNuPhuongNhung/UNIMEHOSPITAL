package PBL6.example.UNIME.controller;

import PBL6.example.UNIME.dto.request.DoctorServiceRequest;
import PBL6.example.UNIME.dto.response.ApiResponse;
import PBL6.example.UNIME.dto.response.DoctorResponse;
import PBL6.example.UNIME.dto.response.ServiceResponse;
import PBL6.example.UNIME.service.DoctorServiceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/doctorservice")
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class DoctorServiceCotroller {
    DoctorServiceService service;

    @PostMapping
    ApiResponse<List<DoctorResponse>> addDoctorForService(@RequestBody DoctorServiceRequest request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        return ApiResponse.<List<DoctorResponse>>builder()
                .result(service.addDoctorForService(authentication.getName(), request))
                .build();
    }

    @DeleteMapping
    ApiResponse<List<DoctorResponse>> delDoctorForService(@RequestBody DoctorServiceRequest request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        return ApiResponse.<List<DoctorResponse>>builder()
                .result(service.delDoctorForSerVice(authentication.getName(), request))
                .build();
    }

    @GetMapping("/get/doctorList/{service_id}")
    ApiResponse<List<DoctorResponse>> getDoctorForService(@PathVariable("service_id") Integer serviceId ) {
        return ApiResponse.<List<DoctorResponse>>builder()
                .result(service.getDoctorByService(serviceId))
                .build();
    }

    @GetMapping("/get/serviceList/{doctor_id}")
    ApiResponse<List<ServiceResponse>> getServiceByDoctor(@PathVariable("doctor_id") Integer serviceId ) {
        return ApiResponse.<List<ServiceResponse>>builder()
                .result(service.getServicesByDoctorId(serviceId))
                .build();
    }


    }
