package PBL6.example.UNIME.controller;

import PBL6.example.UNIME.dto.request.MailRequest;
import PBL6.example.UNIME.dto.response.ApiResponse;
import PBL6.example.UNIME.service.OTPService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sendOtp")
public class MailController {
    @Autowired
    private OTPService otpService;

    @PostMapping
    ApiResponse<String> sendOtp(@RequestBody @Valid MailRequest mailRequest) {
        return ApiResponse.<String>builder()
                .result(otpService.sendOtp(mailRequest)).build();
    }
}
