package PBL6.example.UNIME.repository;

import PBL6.example.UNIME.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    Department findBydepartmentName(String departmentName);
    List<Department> findByDepartmentNameContaining(String departmentName);

}
