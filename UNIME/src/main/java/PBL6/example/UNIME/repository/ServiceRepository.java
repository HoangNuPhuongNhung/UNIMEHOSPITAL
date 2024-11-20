package PBL6.example.UNIME.repository;

import PBL6.example.UNIME.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
    boolean existsByserviceName(String serviceName);
    List<Service> findByServiceNameContaining(String serviceName);

}
