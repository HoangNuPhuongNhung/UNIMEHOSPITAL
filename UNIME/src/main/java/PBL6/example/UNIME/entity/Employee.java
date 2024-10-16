package PBL6.example.UNIME.entity;

import PBL6.example.UNIME.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    Integer employeeId;

    @OneToOne
    @JoinColumn(name = "employee_userId", referencedColumnName = "user_id", nullable = false, unique = true)
    User employeeUserId;

    @Column(name = "employee_name", nullable = false)
    String employeeName ;

    @Column(name = "employee_phonenumber", nullable = false)
    String employeePhonenumber ;

    @Column(name = "employee_gender", nullable = false)
    boolean employeeGender ;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id", nullable = false)
    Department department;

    @Column(name = "employee_status", nullable = false)
    String employeeStatus = Status.ON.name();
}
