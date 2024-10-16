-- 03.sql --> Liên quan đến AppoinmentSchedule
-- PATIENT, APPOINMENT

use UnimeHospital;
-- Drop table APPOINTMENT;
--- use UnimeHospital;
--- ALTER TABLE patient DROP INDEX UKoite44ipliqyhyqvferj1yxom;

create table APPOINTMENT(
	appointment_id INT PRIMARY KEY AUTO_INCREMENT, 
    patient_id INT NOT NULL,
    doctortimework_id INT NOT NULL,
    employee_id INT NOT NULL, 
    doctorservice_id INT NOT NULL,
    appointment_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    appointment_status VARCHAR(255) DEFAULT 'Pending' NOT NULL,
    appointment_note VARCHAR(255),
    CONSTRAINT CHECK_APPOINMENT_STATUS CHECK (appointment_status IN ('Confirmed', 'Pending', 'Completed')),
    CONSTRAINT UNQ_DOCTORTIMEWORK UNIQUE(doctortimework_id),
    CONSTRAINT FK_APPOINTMENT_PATIENT FOREIGN KEY (patient_id)
									  REFERENCES PATIENT(patient_id),
    CONSTRAINT FK_APPOINTMENT_DOCTORTIMEWORK FOREIGN KEY (doctortimework_id)
									  REFERENCES DOCTOR_TIMEWORK(doctortimework_id),
    CONSTRAINT FK_APPOINTMENT_EMPLOYEE FOREIGN KEY (employee_id)
									  REFERENCES EMPLOYEE(employee_id), 
	CONSTRAINT FK_APPOINTMENT_DOCTORSERVICE FOREIGN KEY (doctorservice_id)
									  REFERENCES DOCTOR_SERVICE (doctorservice_id)					
    
);