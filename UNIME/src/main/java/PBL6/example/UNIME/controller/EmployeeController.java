package PBL6.example.UNIME.controller;

import PBL6.example.UNIME.dto.request.EmployeeRequest;
import PBL6.example.UNIME.dto.response.ApiResponse;
import PBL6.example.UNIME.dto.response.EmployeeResponse;
import PBL6.example.UNIME.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class EmployeeController {
    EmployeeService employeeService;

    @PostMapping
    ApiResponse<EmployeeResponse> createEmployee(@RequestBody @Valid EmployeeRequest request){
        ApiResponse<EmployeeResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(employeeService.createEmployee(request));
        return apiResponse;
    }

    @GetMapping
    ApiResponse<List<EmployeeResponse>> getAllEmployees(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return ApiResponse.<List<EmployeeResponse>>builder()
                .result(employeeService.getAllEmployee())
                .build();
    }

    @GetMapping("/{employee_id}")
    ApiResponse<EmployeeResponse> getEmployeeById(@PathVariable("employee_id") Integer employeeId){
        return ApiResponse.<EmployeeResponse>builder()
                .result(employeeService.getEmployeeById(employeeId))
                .build();
    }

    @PutMapping("/update/{employee_id}")
    ApiResponse<EmployeeResponse> updateByAdmin(@PathVariable("employee_id") Integer employeeId,@RequestBody EmployeeRequest request){

        return ApiResponse.<EmployeeResponse>builder()
                .result(employeeService.updateByAdmin(employeeId, request))
                .build();
    }

    @DeleteMapping("/{employee_id}")
    ApiResponse<String> deleteEmployee(@PathVariable("employee_id") Integer employeeId){

        employeeService.deleteEmployee(employeeId);
        return ApiResponse.<String>builder()
                .result("Employee has been deleted")
                .build();
    }

// ===
    @GetMapping("/myInfo")
    ApiResponse<EmployeeResponse> getEmployeeInfo(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        return ApiResponse.<EmployeeResponse>builder()
                .result(employeeService.getMyInfo(authentication.getName()))
                .build();
    }

    @PutMapping("/update/myInfo")
    ApiResponse<EmployeeResponse> updateMyInfo(@RequestBody EmployeeRequest request){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        return ApiResponse.<EmployeeResponse>builder()
                .result(employeeService.updateMyInfo(authentication.getName(), request))
                .build();
    }

}
