package PBL6.example.UNIME;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UnimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnimeApplication.class, args);
	}
}