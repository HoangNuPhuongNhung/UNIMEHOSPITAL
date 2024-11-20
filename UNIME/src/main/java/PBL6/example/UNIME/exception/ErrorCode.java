package PBL6.example.UNIME.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED(3333, "Invalid or expired token", HttpStatus.UNAUTHORIZED),
    FORBIDDEN(4444, "you do not have permission", HttpStatus.FORBIDDEN),

    // lỗi đăng nhập
    USER_NOT_EXITED(1011, "User Not Exited", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1012, "Unauthenticated", HttpStatus.BAD_REQUEST),

    // Các mã lỗi liên quan đến thông tin đăng kí
    USERNAME_ALREADY_TAKEN(1021, "Username is already taken", HttpStatus.BAD_REQUEST),
    EMAIL_ALREADY_REGISTERED(1022, "Email is already registered", HttpStatus.BAD_REQUEST),

    // Các mã lỗi liên quan đến Đối tượng
    PATIENT_NOT_FOUND(2001, "Patient not found", HttpStatus.NOT_FOUND),
    DEPARTMENT_NOT_FOUND(2002, "Department not found", HttpStatus.NOT_FOUND),
    DEPARTMENT_EXISTED(2003, "Department is already exist", HttpStatus.BAD_REQUEST),
    SERVICE_NOT_FOUND(2004, "Service not found", HttpStatus.NOT_FOUND),
    SERVICE_EXITED(2005, "Service exited", HttpStatus.BAD_REQUEST),
    TIMEWORK_EXITED(2006, "Timework exited", HttpStatus.BAD_REQUEST),
    TIMEWORK_NOT_FOUND(2007, "Timework not found", HttpStatus.NOT_FOUND),
    DOCTORSERVICE_EXITED(2008, "Doctor service exited", HttpStatus.BAD_REQUEST),
    DOCTORSERVICE_NOT_FOUND(2009, "Doctor service not found", HttpStatus.NOT_FOUND),
    INVALID_DAY(2008, "Invalid day of week", HttpStatus.BAD_REQUEST),
    INVALID_TIME(2009, "Invalid time", HttpStatus.BAD_REQUEST),
    DOCTOR_DETAILS_NOT_FOUND(2003, "Doctor detail not found", HttpStatus.NOT_FOUND),
    DOCTORS_NOT_FOUND(2004, "Doctors not found", HttpStatus.NOT_FOUND),
    EMPLOYEE_NOT_FOUND(2005, "Employee not found", HttpStatus.NOT_FOUND),
    // Các mã lỗi liên quan đến dữ liệu đầu vào
    INVALID_KEY(3000, "Invalid key", HttpStatus.BAD_REQUEST),
    INVALID_USERNAME_FORMAT(3001, "Invalid username format", HttpStatus.BAD_REQUEST), // lớn hơn 6 kí tự
    INVALID_PASSWORD_FORMAT(3002, "Invalid password format", HttpStatus.BAD_REQUEST), // lớn hơn 8 kí tự
    INVALID_EMAIL_FORMAT(3003, "Invalid email format", HttpStatus.BAD_REQUEST), // không đúng định dạng _@gmail.com
    INVALID_PHONE_NUMBER_FORMAT(3004, "Invalid phone number format", HttpStatus.BAD_REQUEST), // đúng định dạng số đt ko
    MISSING_REQUIRED_FIELDS(3005, "Missing required fields", HttpStatus.BAD_REQUEST), // để trống không điền đủ

//    // Các mã lỗi liên quan đến hệ thống
//    INTERNAL_SERVER_ERROR(5001, "Internal server error"),
//    DATABASE_CONNECTION_FAILED(5002, "Database connection failed"),
//
//    // Các mã lỗi khác
//    UNAUTHORIZED_ACCESS(4001, "Unauthorized access"),
//    OPERATION_NOT_ALLOWED(4002, "Operation not allowed");

    ;

    private  int code;
    private  String message;
    private HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
