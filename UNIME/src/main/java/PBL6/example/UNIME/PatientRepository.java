package PBL6.example.UNIME;

import PBL6.example.UNIME.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    boolean existsBypatientId(int patient_Id);
    boolean existsBypatientUsername(String patient_username);
    boolean existsBypatientEmail(String patient_email);
}
