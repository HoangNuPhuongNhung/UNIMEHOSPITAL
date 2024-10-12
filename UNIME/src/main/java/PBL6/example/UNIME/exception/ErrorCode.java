package PBL6.example.UNIME.exception;

public enum ErrorCode {
    //
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception"),

    // lỗi đăng nhập
    USER_NOT_EXITED(1001, "User Not Exited"),
    UNAUTHENTICATED(1002, "Unauthenticated"),

    // Các mã lỗi liên quan đến bệnh nhân
    PATIENT_EXISTED(1101, "Patient already existed"),
    PATIENT_NOT_FOUND(1102, "Patient not found"),
    PATIENT_INVALID(1103, "Invalid patient data"),

    // Các mã lỗi liên quan đến thông tin đăng kí
    USERNAME_ALREADY_TAKEN(2001, "Username is already taken"),
    EMAIL_ALREADY_REGISTERED(2002, "Email is already registered"),

    // Các mã lỗi liên quan đến dữ liệu đầu vào
    INVALID_KEY(3000, "Invalid key"),
    INVALID_USERNAME_FORMAT(3001, "Invalid username format"), // lớn hơn 6 kí tự
    INVALID_PASSWORD_FORMAT(3002, "Invalid password format"), // lớn hơn 8 kí tự
    INVALID_EMAIL_FORMAT(3003, "Invalid email format"), // không đúng định dạng _@gmail.com
    INVALID_PHONE_NUMBER_FORMAT(3004, "Invalid phone number format"), // đúng định dạng số đt ko
    MISSING_REQUIRED_FIELDS(3005, "Missing required fields"), // để trống không điền đủ

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

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
