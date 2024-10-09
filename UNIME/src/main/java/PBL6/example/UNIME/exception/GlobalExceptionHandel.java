package PBL6.example.UNIME.exception;

import PBL6.example.UNIME.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class GlobalExceptionHandel {


    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException re) {

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }


    // runtimeException
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException ae) {

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ae.getErrorCode().getCode());
        apiResponse.setMessage(ae.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    // lỗi truyền vaào ko đúng kiểu dữ liệu
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    ResponseEntity<ApiResponse> handleTypeMismatch(MethodArgumentTypeMismatchException e) {

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(1001);
        apiResponse.setMessage("Invalid input: " + e.getValue() + " is not valid");

        return ResponseEntity.badRequest().body(apiResponse);
    }

    // lỗi truyền vào ko đúng kiểu dữ liệu
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handingValidation (MethodArgumentNotValidException e) {

        String enumKey = e.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        try{
            errorCode = ErrorCode.valueOf(enumKey);
        } catch (IllegalArgumentException ex) {
        }
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }

}
