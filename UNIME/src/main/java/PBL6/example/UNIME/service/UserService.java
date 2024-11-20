package PBL6.example.UNIME.service;

import PBL6.example.UNIME.entity.User;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public User createUser(User request) {
        if(userRepository.existsByusername(request.getUsername())) {
            throw new AppException(ErrorCode.USERNAME_ALREADY_TAKEN);
        }
        if(userRepository.existsByemail(request.getEmail())){
            throw new AppException(ErrorCode.EMAIL_ALREADY_REGISTERED);
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setImage(request.getImage());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        return userRepository.save(user);
    }

    public User updateUser(Integer userId, User request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXITED));
        if( userRepository.existsByemail(request.getEmail())){
            User userByEmail = getUserByEmail(request.getEmail());
            log.info(" === id:{} với id:{} ", userId, userByEmail.getUserId());
            if(!userByEmail.getUserId().equals(userId)) {
                throw new AppException(ErrorCode.EMAIL_ALREADY_REGISTERED);
            }
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setImage(request.getImage());
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
