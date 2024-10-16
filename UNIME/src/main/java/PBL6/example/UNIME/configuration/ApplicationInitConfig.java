package PBL6.example.UNIME.configuration;

import PBL6.example.UNIME.entity.User;
import PBL6.example.UNIME.enums.Role;
import PBL6.example.UNIME.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@Configuration
public class ApplicationInitConfig {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            if( userRepository.findByusername("admin").isEmpty()){
                User user = new User().builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .email("admin@gmail.com")
                        .role(Role.ADMIN.name())
                        .build();
                userRepository.save(user);
                log.warn("admin user created");
            }
        };
    }

}
