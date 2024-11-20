-- 01.sql 
-- USER, PATIENT

use UnimeHospital;

-- lớp chung để chứa tài khoản người dùng có unique username và email để tránh dùng chung email và username
-- ràng buộc role chỉ được chứa ('PATIENT', 'DOCTOR', 'EMPLOYEE', 'ADMIN')
CREATE TABLE USER(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_username VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_role VARCHAR(10) NOT NULL,
    CONSTRAINT CHECK_USER_ROLE CHECK (user_role IN ('PATIENT', 'DOCTOR', 'EMPLOYEE', 'ADMIN')),
    CONSTRAINT UNQ_USER_USERNAME UNIQUE(user_username),
    CONSTRAINT UNQ_USER_EMAIL UNIQUE(user_email)
);
-- ALTER TABLE USER DROP CONSTRAINT CHECK_USER_ROLE 
 
 
CREATE TABLE PATIENT(
	patient_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_userId INT NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    patient_address VARCHAR(255),
    patient_phonenumber VARCHAR(20) NOT NULL,
    patient_gender BIT(1) NOT NULL,
    patient_date_of_birth DATE,
    CONSTRAINT UNQ_PATIENT_USERID UNIQUE(patient_userId),
    CONSTRAINT FK_PATIENT_USER FOREIGN KEY (patient_userId)
									  REFERENCES USER(user_id)
);