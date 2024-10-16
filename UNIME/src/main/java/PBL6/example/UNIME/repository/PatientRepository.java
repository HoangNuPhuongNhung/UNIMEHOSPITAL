package PBL6.example.UNIME.repository;

import PBL6.example.UNIME.entity.Patient;
import PBL6.example.UNIME.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Optional<Patient> findBypatientUserId(User patientUserId);
}
