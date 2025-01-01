package PBL6.example.UNIME.service;

import PBL6.example.UNIME.entity.Appointment;
import PBL6.example.UNIME.entity.User;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final UserServiceImpl userService;
    private final ResourceLoader resourceLoader;
    Locale vietnam = new Locale("vi", "VN");

    public String sendOtp(String mail) {
        Resend resend = new Resend("re_UwUSKQNg_EMC7CsQgrUDzsMzcZwXQfBmx");
        String randomOtp = generateNum(4);
        String htmlTemplate="";
        try {
            Resource resource = resourceLoader.getResource("classpath:static/email.html");
            htmlTemplate = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            htmlTemplate = htmlTemplate.replace("{{OTP}}", randomOtp);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to read email template", e);
        }

        // Kiểm tra template không rỗng
        if (htmlTemplate.isEmpty()) {
            throw new RuntimeException("Email template is empty");
        }

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("UNIME <hospital@unime.site>")
                .to(mail)
                .subject("Thư gửi mã OTP xác thực từ bệnh viện Unime")
                .html(htmlTemplate)
                .build();

        try {
            CreateEmailResponse data = resend.emails().send(params);
            return randomOtp;
        } catch (ResendException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }

    public String sendPasswork(String mail){
        Resend resend = new Resend("re_UwUSKQNg_EMC7CsQgrUDzsMzcZwXQfBmx");
        String newPasswork = generateNum(8);
        String htmlTemplate="";
        try {
            Resource resource = resourceLoader.getResource("classpath:static/emailPass.html");
            htmlTemplate = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            htmlTemplate = htmlTemplate.replace("{{PASS}}", newPasswork);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to read email template", e);
        }

        // Kiểm tra template không rỗng
        if (htmlTemplate.isEmpty()) {
            throw new RuntimeException("Email template is empty");
        }
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("UNIME <hospital@unime.site>")
                .to(mail)
                .subject("Thư gửi mật khẩu mới từ bệnh vện Unime")
                .html(htmlTemplate)
                .build();
        User user = userService.getUserByEmail(mail);
        try {
            CreateEmailResponse data = resend.emails().send(params);
        } catch (ResendException e) {
            e.printStackTrace();
        }
        userService.saveNewPassword(user, newPasswork);
        return "New passwword: " +newPasswork;
    }


    public void sendCancelEmail(Appointment appointments) {

        String emailDoctor = appointments.getDoctorservice().getDoctor().getDoctorUserId().getEmail();
        String doctorName = appointments.getDoctortimework().getDoctor().getDoctorName();
        String emailPatient = appointments.getPatient().getPatientUser().getEmail();

        Resend resend = new Resend("re_UwUSKQNg_EMC7CsQgrUDzsMzcZwXQfBmx");
        Integer year = appointments.getDoctortimework().getYear();
        Integer weekOfYear = appointments.getDoctortimework().getWeekOfYear();
        DayOfWeek dayOfWeek = DayOfWeek.valueOf(appointments.getDoctortimework().getTimeWork().getDayOfWeek());

        LocalDate date = getDateFromWeekAndDayOfWeek(weekOfYear, year, dayOfWeek);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = date.format(formatter);
        String note = appointments.getAppointmentNote();

        String htmlTemplate="";
        try {
            Resource resource = resourceLoader.getResource("classpath:static/cancelAppoinment.html");
            htmlTemplate = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            htmlTemplate = htmlTemplate.replace("{{DATE}}", formattedDate);
            htmlTemplate = htmlTemplate.replace("{{NOTE}}", note);
            htmlTemplate = htmlTemplate.replace("{{DOCTOR}}", doctorName);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to read email template", e);
        }
        // Kiểm tra template không rỗng
        if (htmlTemplate.isEmpty()) {
            throw new RuntimeException("Email template is empty");
        }

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("UNIME <hospital@unime.site>")
                .to(emailDoctor, emailPatient)
                .subject("Bệnh viện Unime gửi thông báo về lịch khám")
                .html(htmlTemplate)
                .build();
        try {
            CreateEmailResponse data = resend.emails().send(params);
        } catch (ResendException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }



    @Override
    public void sendSuccessEmail(Appointment appointments) {

        String emailDoctor = appointments.getDoctorservice().getDoctor().getDoctorUserId().getEmail();
        String doctorName = appointments.getDoctortimework().getDoctor().getDoctorName();
        String emailPatient = appointments.getPatient().getPatientUser().getEmail();

        Resend resend = new Resend("re_UwUSKQNg_EMC7CsQgrUDzsMzcZwXQfBmx");
        Integer year = appointments.getDoctortimework().getYear();
        Integer weekOfYear = appointments.getDoctortimework().getWeekOfYear();
        DayOfWeek dayOfWeek = DayOfWeek.valueOf(appointments.getDoctortimework().getTimeWork().getDayOfWeek());

        LocalDate date = getDateFromWeekAndDayOfWeek(weekOfYear, year, dayOfWeek);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = date.format(formatter);
        String note = appointments.getAppointmentNote();

        String htmlTemplate="";
        try {
            Resource resource = resourceLoader.getResource("classpath:static/makeAppointment.html");
            htmlTemplate = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            htmlTemplate = htmlTemplate.replace("{{DATE}}", formattedDate);
            htmlTemplate = htmlTemplate.replace("{{DOCTOR}}", doctorName);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to read email template", e);
        }
        // Kiểm tra template không rỗng
        if (htmlTemplate.isEmpty()) {
            throw new RuntimeException("Email template is empty");
        }

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("UNIME <hospital@unime.site>")
                .to(emailDoctor, emailPatient)
                .subject("Bệnh viện Unime gửi thông báo về lịch khám")
                .html(htmlTemplate)
                .build();
        try {
            CreateEmailResponse data = resend.emails().send(params);
        } catch (ResendException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }




    private String generateNum(int digitCount) {

        SecureRandom random = new SecureRandom();
        int minValue = (int) Math.pow(10, digitCount - 1);
        int maxValue = (int) Math.pow(10, digitCount) - 1;
        int otp = minValue + random.nextInt(maxValue - minValue + 1);

        return String.valueOf(otp);
    }

    public LocalDate getDateFromWeekAndDayOfWeek(Integer week, Integer year, DayOfWeek dayOfWeekStr) {
        // Validate week number
        if (week < 1 || week > 53) {
            throw new IllegalArgumentException("Week number must be between 1 and 53");
        }
        LocalDate firstDayOfYear = LocalDate.of(year, 1, 1);
        WeekFields weekFields = WeekFields.of(vietnam);
        LocalDate date =  firstDayOfYear
                .with(weekFields.weekOfWeekBasedYear(), week)
                .with(weekFields.dayOfWeek(), getDayOfWeek(dayOfWeekStr));
        return date;
    }

    private static int getDayOfWeek(DayOfWeek dayOfWeekStr) {
        return switch (dayOfWeekStr) {
            case DayOfWeek.MONDAY -> 1;
            case DayOfWeek.TUESDAY  -> 2;
            case DayOfWeek.WEDNESDAY -> 3;
            case DayOfWeek.THURSDAY -> 4;
            case DayOfWeek.FRIDAY -> 5;
            case DayOfWeek.SATURDAY -> 6;
            case DayOfWeek.SUNDAY -> 7;
            default -> throw new IllegalArgumentException("Invalid day of the week: " + dayOfWeekStr);
        };
    }

}
