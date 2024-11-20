package PBL6.example.UNIME.controller;

import PBL6.example.UNIME.dto.request.TimeworkRequest;
import PBL6.example.UNIME.dto.response.ApiResponse;
import PBL6.example.UNIME.dto.response.TimeworkResponse;
import PBL6.example.UNIME.service.TimeworkService;
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
@RequestMapping("/timeworks")
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class TimeworkController {
    TimeworkService timeworkService;

    @PostMapping
    ApiResponse<TimeworkResponse> createTimework(@RequestBody @Valid TimeworkRequest request) {
        ApiResponse<TimeworkResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(timeworkService.createTimework(request));
        return apiResponse;
    }
    @GetMapping("/{timework_id}")
    ApiResponse<TimeworkResponse> getTimework(@PathVariable("timework_id") Integer timeworkId) {
        return ApiResponse.<TimeworkResponse>builder()
                .result(timeworkService.getTimeworkById(timeworkId))
                .build();

    }

    @PutMapping("/{timework_id}")
    ApiResponse<TimeworkResponse> updateTimework(@PathVariable("timework_id") Integer timeworkId, @RequestBody @Valid TimeworkRequest request) {
        return ApiResponse.<TimeworkResponse>builder()
                .result(timeworkService.updateTimework(timeworkId, request))
                .build();
    }

    @DeleteMapping("/{timework_id}")
    ApiResponse<String> deleteTimework(@PathVariable("timework_id") Integer timeworkId) {
        timeworkService.deleteTimework(timeworkId);
        return ApiResponse.<String>builder()
                .result("Timework has been deleted")
                .build();
    }

    @GetMapping("/get/timewordList")
    ApiResponse<List<TimeworkResponse>> getAllTimeworks() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return ApiResponse.<List<TimeworkResponse>>builder()
                .result(timeworkService.getAllTimeworks())
                .build();

    }

}
