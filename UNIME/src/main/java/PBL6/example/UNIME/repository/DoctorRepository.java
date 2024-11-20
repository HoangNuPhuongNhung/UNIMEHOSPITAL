package PBL6.example.UNIME.repository;

import PBL6.example.UNIME.entity.Doctor;
import PBL6.example.UNIME.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Optional<Doctor> findBydoctorUserId(User doctorUserId);
    List<Doctor> findByDoctorNameContaining(String doctorName);
}
