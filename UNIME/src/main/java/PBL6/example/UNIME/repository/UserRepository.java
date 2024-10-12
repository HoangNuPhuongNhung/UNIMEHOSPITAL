package PBL6.example.UNIME.repository;

import PBL6.example.UNIME.entity.Patient;
import PBL6.example.UNIME.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByusername(String username);
    boolean existsByemail(String email);
    Optional<User> findByusername(String username);
    Optional<User> findByemail(String email);
    Optional<User> findByuserId(Integer userId);
}
