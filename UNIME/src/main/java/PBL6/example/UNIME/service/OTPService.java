package PBL6.example.UNIME.service;
import PBL6.example.UNIME.dto.request.MailRequest;
import com.resend.*;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class OTPService {

    public String sendOtp(MailRequest request){
        Resend resend = new Resend("re_UwUSKQNg_EMC7CsQgrUDzsMzcZwXQfBmx");
        String randomOtp = generteOtp();
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("admin <hostipal@unime.site>")
                .to(request.getEmail())
                .subject("Receive OTP from Unime Hospital ")
                .html("<strong>Your OTP is: " + randomOtp + "</strong>")
                .build();
        try {
            CreateEmailResponse data = resend.emails().send(params);
        } catch (ResendException e) {
            e.printStackTrace();
        }
        return randomOtp;
    }
    private  String generteOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 1000 + random.nextInt(9000);
        return String.valueOf(otp);
    }

}
