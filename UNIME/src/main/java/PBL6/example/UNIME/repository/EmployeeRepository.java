package PBL6.example.UNIME.repository;

import PBL6.example.UNIME.entity.Employee;
import PBL6.example.UNIME.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Optional<Employee> findByemployeeUserId(User employeeUserId);

}
