package PBL6.example.UNIME.controller;

import PBL6.example.UNIME.dto.request.DoctorRequest;
import PBL6.example.UNIME.dto.request.DoctorRequest;
import PBL6.example.UNIME.dto.response.ApiResponse;
import PBL6.example.UNIME.dto.response.DoctorResponse;
import PBL6.example.UNIME.dto.response.DoctorResponse;
import PBL6.example.UNIME.service.DoctorService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/doctors")
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class DoctorController {

    DoctorService doctorService;

    @PostMapping
    ApiResponse<DoctorResponse> createDoctor(@RequestBody @Valid DoctorRequest request){
        ApiResponse<DoctorResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(doctorService.createDoctor(request));
        return apiResponse;
    }

    @PutMapping("/update/{doctor_id}")
    ApiResponse<DoctorResponse> updateByAdmin(@PathVariable("doctor_id") Integer doctorId,@RequestBody DoctorRequest request){

        return ApiResponse.<DoctorResponse>builder()
                .result(doctorService.updateByAdmin(doctorId, request))
                .build();
    }

    @DeleteMapping("/{doctor_id}")
    ApiResponse<String> deleteDoctor(@PathVariable("doctor_id") Integer doctorId){

        doctorService.deleteDoctor(doctorId);
        return ApiResponse.<String>builder()
                .result("Doctor has been deleted")
                .build();
    }
    @GetMapping("/{doctor_id}")
    ApiResponse<DoctorResponse> getDoctorById(@PathVariable("doctor_id") Integer doctorId){
        return ApiResponse.<DoctorResponse>builder()
                .result(doctorService.getDoctorById(doctorId))
                .build();
    }

    //====

    @GetMapping("/myInfo")
    ApiResponse<DoctorResponse> getDoctorInfo(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        return ApiResponse.<DoctorResponse>builder()
                .result(doctorService.getMyInfo(authentication.getName()))
                .build();
    }
    @PutMapping("/update/myInfo")
    ApiResponse<DoctorResponse> updateMyInfo(@RequestBody DoctorRequest request){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        return ApiResponse.<DoctorResponse>builder()
                .result(doctorService.updateMyInfo(authentication.getName(), request))
                .build();
    }

    //====

    @GetMapping("/get/doctorList")
    ApiResponse<List<DoctorResponse>> getAllDoctors(){
        return ApiResponse.<List<DoctorResponse>>builder()
                .result(doctorService.getAllDoctors())
                .build();
    }

    @GetMapping("/get/{doctor_name}")
    ApiResponse<List<DoctorResponse>> getDoctorByName(@PathVariable("doctor_name") String doctorName){
        return ApiResponse.<List<DoctorResponse>>builder()
                .result(doctorService.getDoctorByName(doctorName))
                .build();
    }
}
