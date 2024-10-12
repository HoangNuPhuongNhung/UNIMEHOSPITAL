package PBL6.example.UNIME.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    Integer userId;

    @Column(name = "user_username", nullable = false, length = 255)
    String username;

    @Column(name = "user_password", nullable = false, columnDefinition = "TEXT")
    String password;

    @Column(name = "user_email", nullable = false, length = 255)
    String email;

    @Column(name = "user_role", nullable = false, length = 10)
    String role;
    
    @OneToOne(mappedBy = "patientUserId")
    Patient patient;
}
