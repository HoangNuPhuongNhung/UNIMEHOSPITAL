package PBL6.example.UNIME.repository;

import PBL6.example.UNIME.entity.Doctor;
import PBL6.example.UNIME.entity.DoctorService;
import PBL6.example.UNIME.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorServiceRepository extends JpaRepository <DoctorService, Integer> {
    List<DoctorService> findBydoctor(Doctor doctor);
    List<DoctorService> findByservice(Service service);
    DoctorService findByDoctorAndService(Doctor doctor, Service service);
}
