package PBL6.example.UNIME.repository;

import PBL6.example.UNIME.entity.DoctorTimework;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  DoctorTimeworkRepository extends JpaRepository<DoctorTimework, Integer> {

}
