package PBL6.example.UNIME.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    Integer departmentId;

    @Column(name = "department_name", nullable = false)
    String departmentName ;

    @Column(name = "department_description", nullable = false)
    String departmentDescription ;

    @OneToMany(mappedBy = "department")
    List<Employee> employeeList;
    @OneToMany(mappedBy = "department")
    List<Doctor> departmentList;
}
