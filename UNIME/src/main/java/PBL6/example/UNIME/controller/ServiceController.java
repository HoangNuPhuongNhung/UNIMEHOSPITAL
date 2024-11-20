package PBL6.example.UNIME.controller;

import PBL6.example.UNIME.dto.request.ServiceRequest;
import PBL6.example.UNIME.dto.response.ApiResponse;
import PBL6.example.UNIME.dto.response.ServiceResponse;
import PBL6.example.UNIME.service.ServiceService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class ServiceController {
    ServiceService serviceService;

    @PostMapping
    ApiResponse<ServiceResponse> createService(@RequestBody @Valid ServiceRequest request) {
        ApiResponse<ServiceResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(serviceService.createService(request));
        return apiResponse;
    }

    @GetMapping("/{service_id}")
    ApiResponse<ServiceResponse> getServiceById(@PathVariable("service_id") Integer serviceId) {
        return ApiResponse.<ServiceResponse>builder()
                .result(serviceService.getServiceById(serviceId))
                .build();
    }

    @PutMapping("/{service_id}")
    ApiResponse<ServiceResponse> updateService(@PathVariable("service_id") Integer serviceId, @RequestBody ServiceRequest request) {
        return ApiResponse.<ServiceResponse>builder()
                .result(serviceService.updateService(serviceId, request))
                .build();
    }
    @DeleteMapping("/{service_id}")
    ApiResponse<String> deleteService(@PathVariable("service_id") Integer serviceId) {
        serviceService.deleteService(serviceId);
        return ApiResponse.<String>builder()
                .result( "Service has been deleted")
                .build();
    }


    // ==== public
    @GetMapping("/get/serviceList")
    ApiResponse<List<ServiceResponse>> getAllServices() {
        return ApiResponse.<List<ServiceResponse>>builder()
                .result(serviceService.getAllServices())
                .build();
    }

    @GetMapping("/get/{service_name}")
    ApiResponse<List<ServiceResponse>> getServiceByName(@PathVariable("service_name") String serviceName) {
        return ApiResponse.<List<ServiceResponse>>builder()
                .result(serviceService.findServiceByName(serviceName))
                .build();
    }

}
