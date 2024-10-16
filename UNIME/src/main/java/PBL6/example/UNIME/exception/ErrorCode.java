package PBL6.example.UNIME.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    //
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED(401, "you do not have permission", HttpStatus.UNAUTHORIZED),
    // lỗi đăng nhập
    USER_NOT_EXITED(1001, "User Not Exited", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1002, "Unauthenticated", HttpStatus.UNAUTHORIZED),

    // Các mã lỗi liên quan đến bệnh nhân
    PATIENT_EXISTED(1101, "Patient already existed", HttpStatus.BAD_REQUEST),
    PATIENT_NOT_FOUND(1102, "Patient not found", HttpStatus.NOT_FOUND),
    PATIENT_INVALID(1103, "Invalid patient data", HttpStatus.BAD_REQUEST),

    // Các mã lỗi liên quan đến thông tin đăng kí
    USERNAME_ALREADY_TAKEN(2001, "Username is already taken", HttpStatus.BAD_REQUEST),
    EMAIL_ALREADY_REGISTERED(2002, "Email is already registered", HttpStatus.BAD_REQUEST),

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
