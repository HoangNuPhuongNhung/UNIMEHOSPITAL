-- 01.sql --> Liên quan đến HospitalManagement
-- EMPLOYEE, DEPARTMENT, DOCTOR, DOCTOR_DETAIL, SERVICE, DOCTOR_SERVICE

use UnimeHospital;

create table DEPARTMENT(
	department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    department_description VARCHAR(255) NOT NULL,
    CONSTRAINT UNQ_DEPARTMENT_NAME UNIQUE(department_name)
);
 
 
-- EMPLOYEE sẽ có 2 status là ON/OFF, mặc định sẽ là "ON"
-- username và email sẽ không được trùng nhau giữa các tài khoản
-- có 1 khóa ngoại là FK_EMPLOYEE_DEPARTMENT
create table EMPLOYEE(
	employee_id INT PRIMARY KEY AUTO_INCREMENT, 
    employee_userId INT NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    employee_phonenumber VARCHAR(20) NOT NULL,
    employee_gender BIT(1) NOT NULL,
    department_id INT NOT NULL,
	employee_status VARCHAR(255) DEFAULT 'ON' NOT NULL,
    CONSTRAINT CHECK_EMPLOYEE_STATUS CHECK (employee_status IN ('ON', 'OFF')),
	CONSTRAINT UNQ_EMPLOYEE_USEID UNIQUE(employee_userId),
    CONSTRAINT FK_EMPLOYEE_USER FOREIGN KEY (employee_userId)
									  REFERENCES USER(user_id),
    CONSTRAINT FK_EMPLOYEE_DEPARTMENT FOREIGN KEY (department_id)
									  REFERENCES DEPARTMENT(department_id)
);
-- ALTER TABLE EMPLOYEE CHANGE employee_status employee_status VARCHAR(255) DEFAULT 'ON' NOT NULL;
create table DOCTOR_DETAIL(
	doctordetail_id INT PRIMARY KEY AUTO_INCREMENT,
    doctordetail_information TEXT,
    doctordetail_experience TEXT,
    doctordetail_award_recognization TEXT
);

create table SERVICE(
	service_id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(255) NOT NULL,
    department_id INT NOT NULL,
    service_description VARCHAR(255) NOT NULL,
    service_price INT NOT NULL DEFAULT 0,
    CONSTRAINT UNQ_SERVICE_NAME UNIQUE(service_name),
    CONSTRAINT CHECK_SERVICE_PRICE CHECK (service_price >= 0),
    CONSTRAINT FK_SERVICE_DEPARTMENT FOREIGN KEY (department_id)
									  REFERENCES DEPARTMENT(department_id)
);

-- unique username, email để phân biệt tài khoản
-- unique doctordetail do quan hệ 1-1
create table DOCTOR(
	doctor_id INT PRIMARY KEY AUTO_INCREMENT, 
    doctor_userId INT NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    doctor_address VARCHAR(255) NOT NULL,
    doctor_phonenumber VARCHAR(20) NOT NULL,
    doctor_gender BIT(1) NOT NULL,
    doctor_date_of_birth DATE,
    department_id INT NOT NULL,
    doctordetail_id INT,
	doctor_status VARCHAR(255) DEFAULT 'ON' NOT NULL,
	CONSTRAINT UNQ_DOCTOR_USERID UNIQUE(doctor_userId),
	CONSTRAINT UNQ_DOCTOR_DETAIL UNIQUE(doctordetail_id),
	CONSTRAINT CHECK_DOCTOR_STATUS CHECK (doctor_status IN ('ON', 'OFF')),
    CONSTRAINT FK_DOCTOR_USERID FOREIGN KEY(doctor_userId)
									  REFERENCES USER(user_id),
    CONSTRAINT FK_DOCTOR_DEPARTMENT FOREIGN KEY (department_id)
									  REFERENCES DEPARTMENT(department_id),
	CONSTRAINT FK_DOCTOR_DETAIL FOREIGN KEY (doctordetail_id)
									  REFERENCES DOCTOR_DETAIL(doctordetail_id)
);


-- bảng dịch vụ theo từng bác sĩ (bác sĩ quan hệ n-n với dịch vụ)
-- đồng thời 2 cột bác sĩ và dịch vụ không được trùng nhau
create table DOCTOR_SERVICE(
	doctorservice_id INT PRIMARY KEY AUTO_INCREMENT, 
    doctor_id INT NOT NULL,
    service_id INT NOT NULL,
    CONSTRAINT UNQ_DOCTOR_SERVICE UNIQUE(doctor_id, service_id),
    CONSTRAINT FK_DOCTOR_SERVICE_SERVICE FOREIGN KEY (service_id)
									  REFERENCES SERVICE(service_id),
	CONSTRAINT FK_DOCTOR_SERVICE_DOCTOR FOREIGN KEY (doctor_id)
									  REFERENCES DOCTOR(doctor_id)
);


