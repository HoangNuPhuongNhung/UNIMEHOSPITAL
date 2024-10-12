package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.response.PatientResponse;
import PBL6.example.UNIME.entity.Patient;
import PBL6.example.UNIME.entity.User;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;

    public User createUser(User request) {
        if(userRepository.existsByusername(request.getUsername())) {
            throw new AppException(ErrorCode.USERNAME_ALREADY_TAKEN);
        }
        if(userRepository.existsByemail(request.getEmail())){
            throw new AppException(ErrorCode.EMAIL_ALREADY_REGISTERED);
        }
        User user = new User();
        user.setUsername(request.getUsername());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);    // truyển vào độ mạnh về mã hõa
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        return userRepository.save(user);
    }
    public void deleteUser(Integer user_id) {
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXITED));
        userRepository.deleteById(user.getUserId());
    }

    public boolean ExitByEmail(String email){
        return userRepository.existsByemail(email);
    }
    public boolean ExitByUsername(String username){
        return userRepository.existsByusername(username);
    }
    // get User theo Email
    public User getUserByEmail(String email) {
        return userRepository.findByemail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXITED));
    }
    // get User theo Email
    public User getUserByUsername(String username) {
        return userRepository.findByusername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXITED));
    }

    // get User theo id
    public User getUserById(Integer user_id){
        return userRepository.findByuserId(user_id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXITED));
    }
}
